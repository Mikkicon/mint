import { ethers } from "hardhat";

async function main() {
  const PMV = await ethers.getContractFactory("PMV");
  const pmv = await PMV.deploy();

  await pmv.deployed();

  console.log("PMV deployed to:", pmv.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
