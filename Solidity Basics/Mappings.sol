pragma solidity ^0.8.6;

contract MappingExample {

  mapping(uint => bool) public valueMapping;
  mapping(address => bool) public senderAdressMapping;

  function setValueToTrue(uint _index) public {
      valueMapping[_index] = true;
  }
  
  function setSenderAddressToTrue() public {
      senderAdressMapping[msg.sender] = true;
  }
}