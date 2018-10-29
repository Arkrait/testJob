import * as express from "express";
import Web3 = require("web3");
import bodyParser = require("body-parser");
import * as fs from "fs";

const contractJson = require("../ethereum/build/contracts/CarRegistration.json");
let config = require("./config.json");

const abi = contractJson.abi;
const bc = contractJson.bytecode;

const app = express();

const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");

// deploy only one contract by saving its' address in a config file
console.log(config["contractAddress"]);
if (
  config["contractAddress"] === null ||
  config["contractAddress"] === undefined
) {
  web3.eth.getAccounts().then(result => {
    const contract = new web3.eth.Contract(abi);
    contract
      .deploy({
        data: bc,
        arguments: []
      })
      .send({
        // set this to registrar address in production
        from: result[0],
        gas: 4712388,
        gasPrice: 100000000000
      })
      .then(contract => {
        config.contractAddress = contract.options.address;
        fs.writeFileSync("./config.json", JSON.stringify(config));
        console.log(contract.options.address);
      });
  });
}

app.get("/:address", (req: express.Request, res: express.Response) => {
  let inputtedAddress: string = "0x" + req.params.address;
  console.log(inputtedAddress);
});

app.listen(8080, "localhost");
