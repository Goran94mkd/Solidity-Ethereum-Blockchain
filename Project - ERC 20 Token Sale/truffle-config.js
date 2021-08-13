const path = require("path");
require('dotenv').config({ path: './.env' });
const HDWalletProvider = require("@truffle/hdwallet-provider");
const AccountIndex = 0;

module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    contracts_build_directory: path.join(__dirname, "client/src/contracts"),
    networks: {
        development: {
            port: 7545,
            network_id: "5777",
            host: "127.0.0.1"
        },
        ganache_local: {
            provider: function () {
                return new HDWalletProvider(process.env.MNEMONIC, "http://127.0.0.1:7545", AccountIndex)
            },
            network_id: 5777
        },
        rinkeby: {
            provider: function () {
                // return new HDWalletProvider(process.env.MNEMONIC, "wss://rinkeby.infura.io/ws/v3/your_infura_project_id");
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
}
