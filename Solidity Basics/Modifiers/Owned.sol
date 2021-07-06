pragma solidity ^0.8.6;

contract Owned {
  
  address owner;

  constructor() {
  owner = msg.sender;
  }

  modifier onlyOwner {
  require(msg.sender == owner, "You are not allowed");
  _;
  }
}