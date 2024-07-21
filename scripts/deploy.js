const hre = require("hardhat");
async function main() {
  const DeTask = await hre.ethers.getContractFactory("DeTask");
  const deTask = await DeTask.deploy();
  await deTask.deployed();

  console.log(`A contract is deployed to ${deTask.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }
);
