import { PersistedModel, CallbackWithResult } from "loopback";

export class CarModel extends PersistedModel {
  plate: string;
  brand: string;
  model: string;
  ownerCredentials: string;
  ownerAddress: string;
  horsePower: number;
  static requestRegister: (
    id: string,
    privateKey: string,
    cb: CallbackWithResult<any>
  ) => any;
  static registerCar: (address: string, cb: CallbackWithResult<any>) => any;
  static getCarsFromAddress: (
    address: string,
    index: number,
    cb: CallbackWithResult<any>
  ) => any;
}
