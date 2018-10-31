import Contract from "web3/eth/contract";
import web3 from "./web3instance";
import * as fs from "fs";

// wrapper around the promises that returns a contract
const getContract = function() {
  return web3.eth.getAccounts().then(result => {
    /*
    * This whole thing should be probably refactored because right now you have
    * to drop the server once the contract gets deployed (only once though)
    */
    let registrarAccount: string;
    let contract: Contract;
    // should not be in prod!
    registrarAccount = result[0];
    const contractJson = require("../ethereum/build/contracts/CarRegistration.json");
    let config = JSON.parse(fs.readFileSync("./config.json").toString());

    const abi = contractJson.abi;
    const bc = contractJson.bytecode;

    // deploy only one contract by saving its' address in a config file
    if (
      config.contractAddress === null ||
      config.contractAddress === undefined
    ) {
      contract = new web3.eth.Contract(abi);
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
        });
    }

    contract = new web3.eth.Contract(abi, config.contractAddress);

    // return the instance of our freshly deployed contract in a promise
    return contract;
  });
};

export default getContract;
