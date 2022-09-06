const developmentChains = ["hardhat", "localhost"];
const initialSupply = "1000000000000000000000000";

const networkConfig = {
  31337: {
    name: "hardhat",
  },
};

module.exports = { developmentChains, networkConfig, initialSupply };
