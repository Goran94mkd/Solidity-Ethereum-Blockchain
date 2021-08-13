const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
var mnemonic = "";

const privateKeys = [

];

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    rinkeby: {
      provider: function () {
        // return new HDWalletProvider(privateKeys, "wss://rinkeby.infura.io/ws/v3/your_infura_project_id");
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
    }
  },
  compilers: {
    solc: {
      version: "^0.8.6"
    }
  }
};
