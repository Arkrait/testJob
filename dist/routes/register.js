"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const setupContract_1 = require("../setupContract");
const web3instance_1 = require("../web3instance");
const router = express_1.Router();
let registrarAccount;
web3instance_1.default.eth.getAccounts().then(result => (registrarAccount = result[0]));
router.post("/register/:address", (req, res) => {
    if (req.params.address[0] === "0" && req.params.address[1] === "x") {
        res.send("Please provide the address without specifying the hex type.");
        return;
    }
    const passedAddress = "0x" + req.params.address;
    console.log(registrarAccount);
    setupContract_1.default.events.CarRegistered({}, (err, result) => {
        res.send(result.returnValues);
    });
    setupContract_1.default.methods
        .registerCar(passedAddress)
        .send({
        from: registrarAccount,
        gas: 4712388,
        gasPrice: 100000000000
    })
        .then(result => res.send(result))
        .catch(err => console.log(err));
});
router.post("/register/request/:privateKey", (req, res) => {
    if (req.params.privateKey[0] === "0" && req.params.privateKey[1] === "x") {
        res.send("Please provide the private key without specifying the hex type.");
        return;
    }
    const account = web3instance_1.default.eth.accounts.privateKeyToAccount("0x" + req.params.privateKey);
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
    setupContract_1.default.methods
        .requestRegistration(car.plate, car.description.brand, car.description.model, car.description.ownerCredentials, car.description.horsePower)
        .send({
        from: account.address,
        gas: 4712388,
        gasPrice: 100000000000
    })
        .then(result => console.log(result))
        .catch(err => console.log(err));
});
exports.default = router;
//# sourceMappingURL=register.js.map