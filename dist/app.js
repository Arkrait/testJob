"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Web3 = require("web3");
const bodyParser = require("body-parser");
const fs = require("fs");
const contractJson = require("../ethereum/build/contracts/CarRegistration.json");
let config = JSON.parse(fs.readFileSync("./config.json").toString());
const abi = contractJson.abi;
const bc = contractJson.bytecode;
const app = express();
const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
// deploy only one contract by saving its' address in a config file
console.log(config.contractAddress);
if (config.contractAddress === null || config.contractAddress === undefined) {
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
app.use(bodyParser);
app.post("/register/:address", (req, res) => {
    if (req.params.address[0] === "0" && req.params.address[1] === "x") {
        res.send("Please provide the address without specifying the hex type.");
        return;
    }
    let passedAddress = "0x" + req.params.address;
    // validate address here
    const contract = new web3.eth.Contract(abi, config.contractAddress);
    const car = {
        plate: "myPlate",
        description: {
            brand: "BMW",
            model: "X5",
            ownerCredentials: "myPhone",
            horsePower: 1223
        }
    };
    contract.methods
        .requestRegistration(car.plate, car.description.brand, car.description.model, car.description.ownerCredentials, car.description.horsePower)
        .call({
        from: passedAddress
    });
});
app.listen(8080, "localhost");
//# sourceMappingURL=app.js.map