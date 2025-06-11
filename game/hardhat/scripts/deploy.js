const hre = require("hardhat");

async function main() {
  const Token = await hre.ethers.getContractFactory("ClickToken");
  const token = await Token.deploy();

  await token.waitForDeployment(); 

  console.log("ClickToken deployed to:", await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
