/*
* See:
* https://hardhat.org/hardhat-runner/docs/guides/deploying
* to deploy on local HardHat node:
* npx hardhat node
* npx hardhat clean && npx hardhat run --network hardhat ./hardhat-scripts/deploy.ts
#
* npx hardhat clean && npx hardhat run --network sepolia ./hardhat-scripts/deploy.ts
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

  if (tx.chainId !== "11155111") {
    return;
  }

  // Verification
  // https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-verify#using-programmatically
  /*
  * to prevent the following etherscan error:
  * ContractVerificationMissingBytecodeError: Failed to send contract verification request.
  * Endpoint URL: https://api-sepolia.etherscan.io/api
  * Reason: The Etherscan API responded that the address <address> does not have bytecode.
  * This can happen if the contract was recently deployed and this fact hasn't propagated to the backend yet.
  * Try waiting for a minute before verifying your contract. If you are invoking this from a script,
  * try to wait for five confirmations of your contract deployment transaction before running the verification subtask.
  * */
  let timeStamp = new Date().toLocaleDateString();
  console.log(timeStamp, "pause for etherscan ...");

  await new Promise(resolve => setTimeout(resolve, 70 * 1000));
  const verificationResult = await hre.run("verify:verify", {
    address: contract.target, // contract address
    constructorArguments: []
  });

  // console.log(verificationResult); // undefined

};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
