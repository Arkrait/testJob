var CarRegistration = artifacts.require("./CarRegistration.sol");

module.exports = function(deployer) {
  deployer.deploy(CarRegistration);
};
