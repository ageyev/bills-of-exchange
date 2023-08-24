#!/bin/bash

# =========== Template for WebApp using:
# React and Redux with TypeScript
# Ethers.js
# Hardhat
# GitLab repo and GitLab Pages

# create .env 
# see .template.env

# before check permissions in ~/.ssh , should be:
# chmod 400 <keys>
# and look at your ~/.ssh/config: 
# Host gitlab.com
#     HostName gitlab.com
#     User <username>
#     PreferredAuthentications publickey
#     IdentityFile <path to private key> 
#     IdentitiesOnly yes

source "${HOME}"/.bashrc
# echo "PATH:"
# echo ${PATH}

source ./.env 
echo
echo ".env variables:"
echo """
APP_NAME=${APP_NAME}
GIT_USER_NAME=${GIT_USER_NAME}
GIT_USER_EMAIL=${GIT_USER_EMAIL}
GITLAB_KEY_PATH=${GITLAB_KEY_PATH}
GITHUB_KEY_PATH=${GITHUB_KEY_PATH}
GITHUB_TOKEN_PATH=${GITHUB_TOKEN_PATH}
"""

ssh-add -D # delete all identities
ssh-add "${GITLAB_KEY_PATH}"
ssh-add "${GITHUB_KEY_PATH}"

git config --global user.name "${GIT_USER_NAME}" && git config --global user.email "${GIT_USER_EMAIL}"
echo
echo "git config --list --global :"
echo
git config --list --global 
echo 
# read -p "Press enter to continue" 

echo "GitLab connection test:"
ssh -T git@gitlab.com
echo
echo "GitHub connection test:"
ssh -T git@github.com

echo
read -rp "Press enter to continue or Ctrl-C to escape"

# https://redux-toolkit.js.org/introduction/getting-started#installation 
npx degit reduxjs/redux-templates/packages/vite-template-redux --force

mv .gitignore .gitignore.01
wget https://gitlab.com/-/snippets/2580987/raw/main/.gitignore -O .gitignore 

# (*)
# GitLab
echo "
pages:
  stage: deploy
  script:
    - rm -rf public
    - mv build public
  artifacts:
    paths:
      - public
  only:
    - master
" >.gitlab-ci.yml

echo "
npm run build
git add . && git commit -a -m 'build and upload to GitLab web hosting (pages)' && git push --all
" >gitLab-upload.sh

chmod +x gitLab-upload.sh 

HOME_PAGE_LINE=' "homepage":"https://'"${GIT_USER_NAME}"'.gitlab.io/'"${APP_NAME}"'/",'
NAME_LINE=' "name":"'${APP_NAME}'",'
# this replaces the second line with text
sed -i "2c\ ${NAME_LINE}" package.json
# this appends a string after the second line
sed -i "2a\ ${HOME_PAGE_LINE}" package.json 
# if outDir is not inside project root and will not be emptied. Use --emptyOutDir to override.
# see: https://stackoverflow.com/questions/76114350/vite-dist-is-not-inside-project-root-and-will-not-be-emptied-use-emptyoutdi
BUILD_LINE='    "build": "tsc && vite build --emptyOutDir",'
sed -i "10c\ ${BUILD_LINE}" package.json

git init 
git config --local user.name "${GIT_USER_NAME}" && git config --local user.email "${GIT_USER_EMAIL}"
echo "git config --list --local :"
echo
git config --list --local
echo 

git add . && git commit -a -m 'initial commit'

# create new GitLab repo:
# GitLab can create new private repo on first push (see https://stackoverflow.com/a/64656788/1697878)
git remote add gitlab "git@gitlab.com:${GIT_USER_NAME}/${APP_NAME}.git" && git push -u gitlab master

# (*)
# Make pages visible at:
# Gitlab Project -> Settings --> General -> Visibility, project features, permissions -> Pages > "Everyone" > Save
read -rp "Make pages visible at: Gitlab Project -> Settings --> General -> Visibility, project features, permissions -> Pages > Everyone > Save ; than press Enter to continue"

# Create repo on github using GitHUb CLI
# https://github.com/cli/cli/blob/trunk/docs/install_linux.md 
gh auth login --with-token < "${GITHUB_TOKEN_PATH}"
#  https://cli.github.com/manual/gh_repo_create
gh repo create --source=. --public --remote=github --description="${GIT_USER_NAME}.github.io/${APP_NAME}/" --push

npm install
git add . && git commit -a -m 'npm install'

mkdir -p ./.github/workflows/
wget https://gist.githubusercontent.com/ageyev/254d3228ed1e425c51b8b583d49a9f67/raw/516be9389821d90a88a7362d2b08ab85db2505d0/static.yml -O ./.github/workflows/static.yml

# edit vite.config.ts
#
#  base: "./",
#  root: "./src",
#  build: {
#    assetsDir: "assets", // default
#    outDir: "../build",  //
#    sourcemap: true
#  },

mv ./vite.config.ts ./vite.config.01.ts
# TODO: update link
wget https://gist.githubusercontent.com/ageyev/56f6ef41e5a42accca7b47f7bed2ce8a/raw/13cc37afa1bf7e3de797191cc97c154d9185df49/vite.config.ts

mv ./index.html ./src/index.html
INDEX_HTML_SCRIPT_STRING='<script type="module" src="main.tsx"></script>'
# this replaces line 12 with text
sed -i "12c\ ${INDEX_HTML_SCRIPT_STRING}" ./src/index.html

npm run-script build
git add . && git commit -a -m 'prepare to publish on GitHUb/GitLab Pages'
git push gitlab --all
git push github --all



