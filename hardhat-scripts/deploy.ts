/*
* See:
* https://hardhat.org/hardhat-runner/docs/guides/deploying
* */

import hre from "hardhat";
// noinspection ES6UnusedImports
import ethers from "@nomicfoundation/hardhat-ethers"; // << needed for ts types
// see: https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-ethers#helpers
// helpers are added to the ethers object (hre.ethers)

// function deployContract(name: string, constructorArgs?: any[], signer?: ethers.Signer): Promise<ethers.Contract>;

const main = async () => {
  const accounts = await hre.ethers.getSigners();
  const signerAccount = accounts[0];

  const billsOfExchange = await hre.ethers.deployContract(
    "BillsOfExchange",
    [],
    signerAccount
  );

  await billsOfExchange.waitForDeployment();
  console.log(`Deployed to ${billsOfExchange.target}`);
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

/*
* to deploy on local HardHat node:
* npx hardhat node
* npx hardhat run --network localhost ./hardhat-scripts/deploy.ts
*
* */


