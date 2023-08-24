
# OpenZeppelin
# https://docs.openzeppelin.com/contracts/
npm install --save-dev @openzeppelin/contracts

# Foundry
# https://book.getfoundry.sh/getting-started/installation
curl -L https://foundry.paradigm.xyz | bash
source "${HOME}"/.bashrc
foundryup
git add . && git commit -m "update" # needed before forge init

# TODO: See the foundry-rs/foundry-toolchain GitHub Action: https://github.com/foundry-rs/foundry-toolchain

