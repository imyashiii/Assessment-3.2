require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  
  networks: {
    hardhat: {
      ens: {
        enabled: true,
      },
    },
    localhost: {
      url: "http://localhost:8545",
    },
  },
};