import { PersistedModel } from "loopback";

export class CarModel extends PersistedModel {
  plate: string;
  brand: string;
  model: string;
  ownerCredentials: string;
  horsePower: number;
  register: (id: string, privateKey: string) => string | any;
  test: (anything: any) => any;
}
