const { getNamedAccounts, deployments, network } = require("hardhat");

const {
  developmentChains,
  initialSupply,
} = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const myToken = await deploy("MyToken", {
    from: deployer,
    log: true,
    args: [initialSupply],
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  log(`MyToken deployed at ${myToken.address}`);

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(myToken.address);
  }
};

module.exports.tags = ["all", "mytoken"];
