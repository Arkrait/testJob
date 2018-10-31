import { Router, Request, Response } from "express";
import web3 from "../web3instance";
import getContract from "../getContract";

const router = Router();

router.get("/cars/:address/:id", (req: Request, res: Response) => {
  if (req.params.address[0] === "0" && req.params.address[1] === "x") {
    res.send("Please provide the address without specifying the hex type.");
    return;
  }
  const passedAddress: string = "0x" + req.params.address;
  const id: number = req.params.id - 1;
  getContract().then(contract => {
    console.log(contract.options.address);
    console.log(passedAddress);
    contract.methods
      // get the registered car by id, for example /cars/*address*/1 returns [0] of array
      .getCarByIndex(passedAddress, id)
      .call({
        from: passedAddress,
        gas: 4712388,
        gasPrice: 100000000000
      })
      .then(result => res.send(result));
  });
});

export default router;
