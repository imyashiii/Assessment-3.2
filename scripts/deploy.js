const hre = require("hardhat");
async function main() {
  const DeAuction = await hre.ethers.getContractFactory("DeAuction");
  const deAuction = await DeAuction.deploy();
  await deAuction.deployed();

  console.log(`A contract is deployed to ${deAuction.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }
);
