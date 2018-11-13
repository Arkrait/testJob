import Contract from "web3/eth/contract";
import web3 from "./web3instance";
import * as fs from "fs";

// wrapper around the promises that returns a contract
const getContract = function() {
  return web3.eth.getAccounts().then(result => {
    /*
     * In production replace this code with an actual contract address
     */
    let registrarAccount: string;
    let contractAddress: string;
    let contract: Contract;
    // should not be in prod!
    registrarAccount = result[0];
    const contractJson = require("../ethereum/build/contracts/CarRegistration.json");

    const abi = contractJson.abi;
    const bc = contractJson.bytecode;

    contract = new web3.eth.Contract(abi);
    return contract
      .deploy({
        data: bc,
        arguments: []
      })
      .send({
        // set this to registrar address in production
        from: registrarAccount,
        gas: 4712388,
        gasPrice: 100000000000
      });
  });
};

export default getContract;
