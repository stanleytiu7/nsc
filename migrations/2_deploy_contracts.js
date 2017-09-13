var TodoList = artifacts.require("./TodoList.sol");
var CodeWars = artifacts.require("./CodeWars.sol")

module.exports = function(deployer) {
  deployer.deploy(TodoList);
  deployer.deploy(CodeWars);
};

