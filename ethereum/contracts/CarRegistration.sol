pragma solidity ^0.4.22;

/// @title 
contract CarRegistration {

  struct Car {
    bytes32 plate;
    bytes32 description;
  }

  // address of the person that allows registration
  address public registrar;

  // all registered cars of a person
  mapping(address=>Car[]) private _registeredCars;

  constructor() public {
    registrar = msg.sender;
  }

  function registerCar(bytes32 plate, bytes32 description, address owner) public {
    require(msg.sender == registrar, "Only registrar can register vehicles");
    _registeredCars[owner].push(Car({
      plate: plate,
      description: description
    }));
  }
}
