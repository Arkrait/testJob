import { PersistedModel } from "loopback";

export class Car extends PersistedModel {
  plate: string;
  brand: string;
  model: string;
  ownerCredentials: string;
  horsePower: number;
  register: (id: string, privateKey: string) => 
}
