export interface Car {
  plate: string;
  description: CarDescription;
}

export interface CarDescription {
  brand: string;
  model: string;
  ownerCredentials: string;
  horsePower: number;
}
