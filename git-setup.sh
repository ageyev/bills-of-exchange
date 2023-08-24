source "${HOME}"/.bashrc
source ./.env

ssh-add -D # delete all identities
ssh-add "${GITLAB_KEY_PATH}"
ssh-add "${GITHUB_KEY_PATH}"

git config user.name "${GIT_USER_NAME}" && git config user.email "${GIT_USER_EMAIL}"
echo
echo "git config --list :"
echo
git config --list
echo
# read -p "Press enter to continue"

echo "GitLab connection test:"
ssh -T git@gitlab.com
echo
echo "GitHub connection test:"
ssh -T git@github.com