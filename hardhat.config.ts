import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox"; // needed to import hardhat plugins objects, like 'ether'

// can not import from "hardhat", error:
// You probably tried to import the "hardhat" module from your config or a file imported from it.
// This is not possible, as Hardhat can't be initialized while its config is being defined.
// https://stackoverflow.com/questions/71792535/error-deploying-smart-contract-using-hardhat-error-hh9-error-while-loading-h
// import { ethers } from "hardhat";
// use her.ethers instead, see below

// https://github.com/motdotla/dotenv
import dotenv from "dotenv";

dotenv.config();

// ===== Tasks:
// https://hardhat.org/hardhat-runner/docs/advanced/create-task

//  npx hardhat accounts
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

//  npx hardhat balance --account 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs, hre) => {
    const balance = await hre.ethers.provider.getBalance(taskArgs.account);
    // https://docs.ethers.org/v6/api/utils/#formatEther
    console.log(hre.ethers.formatEther(balance), "ETH");
  });

// https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-ethers
// npx hardhat blockNumber
task(
  "blockNumber",
  "Prints the current block number",
  async (_, { ethers }) => {
    const blockNumber = await ethers.provider.getBlockNumber();
    console.log("Current block number: " + blockNumber);
  }
);

// https://hardhat.org/hardhat-runner/docs/config
const config: HardhatUserConfig = {

  solidity: "0.8.19",

  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
      // See its defaults
    },
    ganache: {
      url: "http://127.0.0.1:7545"
    }
  },

  paths: {
    artifacts: "./src/hh-artifacts",   // < for React
    sources: "./src/contracts",     //
    tests: "./hardhat-tests",       // default
    cache: "./cache"               // default
  },

  // https://github.com/dethcrypto/TypeChain/tree/master/packages/hardhat#configuration
  // npx hardhat typechain
  typechain: {
    outDir: "./src/typechain",
    target: "ethers-v6",
    alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
    externalArtifacts: ["externalArtifacts/*.json"], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
    dontOverrideCompile: false // defaults to false
  }

};

export default config;