"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const web3instance_1 = require("./web3instance");
let registrarAccount;
web3instance_1.default.eth.getAccounts().then(result => (registrarAccount = result[0]));
const contractJson = require("../ethereum/build/contracts/CarRegistration.json");
let config = JSON.parse(fs.readFileSync("./config.json").toString());
const abi = contractJson.abi;
const bc = contractJson.bytecode;
let contract;
// deploy only one contract by saving its' address in a config file
if (config.contractAddress === null || config.contractAddress === undefined) {
    contract = new web3instance_1.default.eth.Contract(abi);
    contract
        .deploy({
        data: bc,
        arguments: []
    })
        .send({
        // set this to registrar address in production
        from: registrarAccount,
        gas: 4712388,
        gasPrice: 100000000000
    })
        .then(contract => {
        config.contractAddress = contract.options.address;
        fs.writeFileSync("./config.json", JSON.stringify(config));
        console.log(contract.options.address);
    });
}
contract = new web3instance_1.default.eth.Contract(abi, config.contractAddress);
exports.default = contract;
//# sourceMappingURL=setupContract.js.map