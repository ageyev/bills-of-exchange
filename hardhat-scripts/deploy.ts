/*
* See:
* https://hardhat.org/hardhat-runner/docs/guides/deploying
* to deploy on local HardHat node:
* npx hardhat node
* npx hardhat run --network localhost ./hardhat-scripts/deploy.ts
* rm -rf ./src/hh-artifacts ./src/typechain/ && npx hardhat run --network localhost ./hardhat-scripts/deploy.ts
* */

import hre from "hardhat";
// noinspection ES6UnusedImports
import ethers from "@nomicfoundation/hardhat-ethers"; // << needed for ts types
// see: https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-ethers#helpers
// helpers are added to the ethers object (hre.ethers)

import createWinstonLogger from "../tools/logger";
import writeObjectToFile from "../tools/writeFile";

interface txInterface {
  blockHash?: string | null,
  blockNumber: number | null,
  chainId: string | null,
  from: string | null,
  gasPrice?: string | null,
  hash: string | null,
  nonce?: number | null,
  data?: string | null
}

const contractName = "BillsOfExchange";

const main = async () => {

  const logger = createWinstonLogger("../logs/contracts_deployment.log");
  const ethers = hre.ethers;

  const signerAccount = (await ethers.getSigners())[0];

  const contract = await ethers.deployContract(
    contractName,
    [],
    signerAccount
  );

  await contract.waitForDeployment();
  const deploymentTransaction = contract.deploymentTransaction();
  if (!deploymentTransaction) {
    logger.error("Deployment failed");
    return;
  }

  const tx: txInterface = {
    chainId: deploymentTransaction.chainId.toString(),
    hash: deploymentTransaction.hash,
    blockHash: deploymentTransaction.blockHash,
    blockNumber: deploymentTransaction.blockNumber,
    nonce: deploymentTransaction.nonce,
    from: deploymentTransaction.from,
    gasPrice: deploymentTransaction.gasPrice.toString()
  };

  const logMessage = `${contractName} deployed to ${contract.target}, chainId: ${tx.chainId}, txHash: ${tx.hash}`;
  logger.info({
    message: logMessage,
    label: "tx"
  });

  // writeObjectToFile(
  //   "../logs/" + contract.target + ".json",
  //   contract
  // );

};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
