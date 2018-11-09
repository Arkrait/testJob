import { CarModel } from "./../../Car.model";
import web3 from "../../web3instance";
import getContract from "../../getContract";
import { PersistedModel } from "loopback";

module.exports = function(Car: PersistedModel) {
  /* I am thinking about ways to change this endpoint so that users don't have to paste their private key
   * in a request but this will probably require the clien to have MetaMask installed for ease of
   * authentication
   */
  Car.register = async function(
    id: string,
    privateKey: string
  ): Promise<string | any> {
    /*
    if (privateKey[0] === "0" && privateKey[1] === "x") {
      return "Please provide the private key without specifying the hex type.";
    }
    const account = web3.eth.accounts.privateKeyToAccount("0x" + privateKey);

    const car: CarModel = {
      plate: body.plate,
      brand: body.brand,
      model: body.model,
      ownerCredentials: body.ownerCredentials,
      horsePower: body.horsePower
    };

    const contract = await getContract();

    const result = await contract.methods
      .requestRegistration(
        car.plate,
        car.brand,
        car.model,
        car.ownerCredentials,
        car.horsePower
      )
      .send({
        from: account.address,
        gas: 4712388,
        gasPrice: 100000000000
      });

    return result;*/
  };

  Car.test = async function(anything) {
    console.log(anything);
    return this.findById(anything).brand;
  };
};
