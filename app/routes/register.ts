import { Router, Request, Response } from "express";
import web3 from "../web3instance";
import carsRouter from "./cars";
import getContract from "../getContract";

const router = Router();

router.use(carsRouter);

let registrarAccount: string;
web3.eth.getAccounts().then(result => (registrarAccount = result[0]));

// This endpoint should be restricted to admins of a service
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

export default router;
