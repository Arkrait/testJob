import { Router, Request, Response } from "express";
import web3 from "../web3instance";
import carsRouter from "./cars";
import getContract from "../getContract";
import { Car } from "../Car.model";

const router = Router();

router.use(carsRouter);

let registrarAccount: string;
web3.eth.getAccounts().then(result => (registrarAccount = result[0]));

router.post("/register/:address", (req: Request, res: Response) => {
  if (req.params.address[0] === "0" && req.params.address[1] === "x") {
    res.send("Please provide the address without specifying the hex type.");
    return;
  }
  const passedAddress = "0x" + req.params.address;
  getContract().then(contract => {
    contract.events.CarRegistered({}, (err, result) => {
      res.send(result.returnValues);
    });
    contract.methods
      .registerCar(passedAddress)
      .send({
        from: registrarAccount,
        gas: 4712388,
        gasPrice: 100000000000
      })
      .catch(err => console.log(err));
  });
});

router.post("/register/request/:privateKey", (req: Request, res: Response) => {
  if (req.params.privateKey[0] === "0" && req.params.privateKey[1] === "x") {
    res.send("Please provide the private key without specifying the hex type.");
    return;
  }
  const account = web3.eth.accounts.privateKeyToAccount(
    "0x" + req.params.privateKey
  );

  console.log(req.body);
  const car: Car = {
    plate: req.body.plate,
    description: {
      brand: req.body.description.brand,
      model: req.body.description.model,
      ownerCredentials: req.body.description.ownerCredentials,
      horsePower: req.body.description.horsePower
    }
  };
  getContract().then(contract => {
    contract.methods
      .requestRegistration(
        car.plate,
        car.description.brand,
        car.description.model,
        car.description.ownerCredentials,
        car.description.horsePower
      )
      .send({
        from: account.address,
        gas: 4712388,
        gasPrice: 100000000000
      })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  });
});

export default router;
