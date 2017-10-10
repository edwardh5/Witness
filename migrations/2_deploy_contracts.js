var Ownable = artifacts.require("./zeppelin/ownership/Ownable.sol");
var Witness = artifacts.require("./Witness.sol");

module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.link(Ownable, Witness);
  deployer.deploy(Witness);
};
