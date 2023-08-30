import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox"; // needed to import hardhat plugins objects, like 'ether'
import { ethers } from "hardhat";

const config: HardhatUserConfig = {
  solidity: "0.8.19"
};

// ===== Tasks:
// https://hardhat.org/hardhat-runner/docs/advanced/create-task
task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs) => {
    const balance = await ethers.provider.getBalance(taskArgs.account);

    console.log(ethers.formatEther(balance), "ETH");
  });

task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
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


export default config;
