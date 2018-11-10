import { PersistedModel } from "loopback";

export interface CarModel {
  plate: string;
  brand: string;
  model: string;
  ownerCredentials: string;
  horsePower: number;
}
