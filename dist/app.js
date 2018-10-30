"use strict";
/*
* I am really not sure how to handle private key security here, but the best solution I see is to delegate the
* signing of a transaction to a client side via Metamask or something similar. For purposes of this being a test job I am leaving
* this server to handle signing by itself.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Web3 = require("web3");
const bodyParser = require("body-parser");
const fs = require("fs");
const contractJson = require("../ethereum/build/contracts/CarRegistration.json");
let config = JSON.parse(fs.readFileSync("./config.json").toString());
// I am not sure where web3 should be instantiated, but by the looks of it I am gonna use
// the private key directly because connecting to MetaMask provider in a backend is not possible
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
const abi = contractJson.abi;
const bc = contractJson.bytecode;
// Change this to actual registrar wallet later!!
let registrarAccount;
web3.eth.getAccounts().then(result => (registrarAccount = result[0]));
const app = express();
app.use(bodyParser.json());
let contract;
// deploy only one contract by saving its' address in a config file
if (config.contractAddress === null || config.contractAddress === undefined) {
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
        console.log(contract.options.address);
    });
}
contract = new web3.eth.Contract(abi, config.contractAddress);
app.post("/register/request/:privateKey", (req, res) => {
    if (req.params.privateKey[0] === "0" && req.params.privateKey[1] === "x") {
        res.send("Please provide the private key without specifying the hex type.");
        return;
    }
    const account = web3.eth.accounts.privateKeyToAccount("0x" + req.params.privateKey);
    console.log(req.body);
    const car = {
        plate: req.body.plate,
        description: {
            brand: req.body.description.brand,
            model: req.body.description.model,
            ownerCredentials: req.body.description.ownerCredentials,
            horsePower: req.body.description.horsePower
        }
    };
    contract.methods
        .requestRegistration(car.plate, car.description.brand, car.description.model, car.description.ownerCredentials, car.description.horsePower)
        .send({
        from: account.address,
        gas: 4712388,
        gasPrice: 100000000000
    })
        .then(result => console.log(result))
        .catch(err => console.log(err));
});
app.post("/register/:address", (req, res) => {
    if (req.params.address[0] === "0" && req.params.address[1] === "x") {
        res.send("Please provide the address without specifying the hex type.");
        return;
    }
    const passedAddress = "0x" + req.params.address;
    contract.events.CarRegistered({}, (err, result) => {
        console.log(result.returnValues);
    });
    contract.methods
        .registerCar(passedAddress)
        .send({
        from: registrarAccount,
        gas: 4712388,
        gasPrice: 100000000000
    })
        .then(result => console.log(result))
        .catch(err => console.log(err));
});
app.listen(8080, "localhost");
//# sourceMappingURL=app.js.map