var Witness = artifacts.require("./Witness.sol");

module.exports = function(deployer) {
  deployer.deploy(Witness);
};
