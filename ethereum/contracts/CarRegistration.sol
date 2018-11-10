pragma solidity ^0.4.22;

/// @title API-controlled contract to register a car
contract CarRegistration {

  struct Car {
    string plate;
    CarDescription description;
  }

  struct CarDescription {
    string brand;
    string model;
    string ownerCredentials;
    string ownerAddress;
    uint horsePower;
  }

  string private _requestedPlate;
  CarDescription private _requestedDescription;

  event CarRegistered(
    address owner,
    string plate,
    string brand,
    string model,
    string ownerCredentials,
    string ownerAddress,
    uint horsePower
  );

  // address of the person that allows registration
  address public registrar;

  // all registered cars of a person
  mapping(address=>Car[]) private _registeredCars;

  constructor() public {
    registrar = msg.sender;
  }

  function registerCar(address owner) public {
    require(msg.sender == registrar, "Only registrar can register vehicles");
    _registeredCars[owner].push(Car({
      plate: _requestedPlate,
      description: _requestedDescription
    }));
    emit CarRegistered(
      owner, 
      _requestedPlate, 
      _requestedDescription.brand, 
      _requestedDescription.model, 
      _requestedDescription.ownerCredentials,
      _requestedDescription.ownerAddress,
      _requestedDescription.horsePower
    );
  }

  function requestRegistration(
    string plate, 
    string brand, 
    string model, 
    string ownerCredentials,
    string ownerAddress,
    uint horsePower) public
    {
    _requestedPlate = plate;
    _requestedDescription = CarDescription({
      brand: brand,
      model: model,
      ownerCredentials: ownerCredentials,
      ownerAddress: ownerAddress,
      horsePower: horsePower
    });
  }

  function getCarByIndex(address owner, uint index) view public returns (
    string plate,
    string brand,
    string model,
    string ownerCredentials,
    string ownerAddress,
    uint horsePower
  ) {
    plate = _registeredCars[owner][index].plate;
    brand = _registeredCars[owner][index].description.brand;
    model = _registeredCars[owner][index].description.model;
    ownerCredentials = _registeredCars[owner][index].description.ownerCredentials;
    ownerAddress = _registeredCars[owner][index].description.ownerAddress;
    horsePower = _registeredCars[owner][index].description.horsePower;
  }
}