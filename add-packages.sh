# =================== Packages to install :

# (*) OpenZeppelin
# https://docs.openzeppelin.com/contracts/
npm install --save-dev @openzeppelin/contracts

# (*) HardHat + Plugins + TypeChain
# https://hardhat.org
# Plugin for IntelliJ: https://github.com/KartanHQ/intellij-hardhat (not needed)
# HardHat CLI:
# https://hardhat.org/hardhat-runner/docs/guides/command-line-completion
# HardHat Toolbox:
# https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-toolbox
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
# see: https://hardhat.org/hardhat-runner/docs/guides/typescript
npx hardhat # < choose 'Create a JavaScript project'
mv hardhat.config.cjs hardhat.config.ts
mv ./contracts ./src/
mv ./test ./hardhat-tests
mv ./scripts ./hardhat-scripts
mkdir "logs"
# npx hardhat # < run this in temp directory, than transfer files and settings here
# 1) copy all content of "compilerOptions" from tsconfig.json > ./tsconfig.json, than comment duplicated properties
# 2) remove ' "type": "module", ' from ./package.json
#
# TypeChain - included in @nomicfoundation/hardhat-toolbox
# https://github.com/dethcrypto/TypeChain
# + TypeChain Hardhat plugin
# https://github.com/dethcrypto/TypeChain/tree/master/packages/hardhat
# (?) npm install --save-dev typechain @typechain/hardhat @typechain/ethers-v6
# add TypeChain section to  hardhatConfig

# (?) Foundry
# https://book.getfoundry.sh/getting-started/installation
# curl -L https://foundry.paradigm.xyz | bash
# source "${HOME}"/.bashrc
# foundryup
# git add . && git commit -m "update" # needed before forge init
# forge init ./src/contracts
# See the foundry-rs/foundry-toolchain GitHub Action: https://github.com/foundry-rs/foundry-toolchain

# (*) dotenv
# https://www.npmjs.com/package/dotenv
# npm install --save-dev dotenv