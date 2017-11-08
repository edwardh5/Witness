var Ownable = artifacts.require("./zeppelin/ownership/Ownable.sol");
var Witness = artifacts.require("./Witness.sol");
var strings = artifacts.require("./strings.sol");

module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.link(Ownable, Witness);
  deployer.deploy(Witness);
  deployer.link(Witness, strings);
  deployer.deploy(strings);
};
