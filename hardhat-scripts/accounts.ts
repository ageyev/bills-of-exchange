/*
* See:
* https://hardhat.org/hardhat-runner/docs/guides/tasks-and-scripts#writing-hardhat-scripts
* Run:
* npx hardhat run ./hardhat-scripts/accounts.ts
* */

import hre from "hardhat";
import ethers from "@nomicfoundation/hardhat-ethers"; // << needed for ts types

async function main() {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
}

// recommended for HardHat scripts:
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});