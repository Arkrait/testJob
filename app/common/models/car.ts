import Contract from "web3/eth/contract";
import { CarModel } from "./../../Car.model";
import web3 from "../../web3instance";
import getContract from "../../getContract";
import { PersistedModel, CallbackWithResult } from "loopback";

module.exports = function(Car: typeof CarModel) {
  let contract: Contract;
  getContract().then(contr => {
    contract = contr;
  });
  /*
   * Probably a really hacky way but this is better then getting contract from a file
   * Plus this helps integrating tests properly
   */
  Car.requestRegister = function(
    id: string,
    privateKey: string,
    cb: CallbackWithResult<string>
  ): any {
    if (privateKey[0] === "0" && privateKey[1] === "x") {
      cb(
        null,
        "Please provide the private key without specifying the hex type."
      );
      return;
    }
    const account = web3.eth.accounts.privateKeyToAccount("0x" + privateKey);
    Car.findById(id, function(err, car) {
      contract.methods
        .requestRegistration(
          car.plate,
          car.brand,
          car.model,
          car.ownerCredentials,
          account.address,
          car.horsePower
        )
        .send({
          from: account.address,
          gas: 4712388,
          gasPrice: 100000000000
        })
        .then(res => {
          cb(null, res);
        })
        .catch(err => {
          cb(err, null);
        });
    });
  };

  Car.registerCar = function(address: string, cb: CallbackWithResult<any>) {
    let registrarAccount: string;
    web3.eth.getAccounts().then(result => (registrarAccount = result[0]));

    if (address[0] === "0" && address[1] === "x") {
      cb(null, "Please provide the address without specifying the hex type.");
      return;
    }
    contract.events.CarRegistered({}, (err, result) => {
      console.log(result);
    });
    contract.methods
      .registerCar("0x" + address)
      .send({
        from: registrarAccount,
        gas: 4712388,
        gasPrice: 100000000000
      })
      .then(res => cb(null, res))
      .catch(err => cb(err, null));
  };

  Car.getCarsFromAddress = function(
    address: string,
    index: number,
    cb: CallbackWithResult<any>
  ) {
    if (address[0] === "0" && address[1] === "x") {
      cb(null, "Please provide the address without specifying the hex type.");
      return;
    }
    const passedAddress: string = "0x" + address;
    index -= 1;
    contract.methods
      // get the registered car by id, for example /cars/*address*/1 returns [0] of array
      .getCarByIndex(passedAddress, index)
      // _call_ instead of _send_ because getCarByIndex is a funcrview
      .call({
        from: passedAddress
      })
      .then(result => cb(null, result))
      .catch(err => cb(err, null));
  };
};
