pragma solidity ^0.8.6;

contract VariablesPracticeExercises {
  uint256 public myUint;
  
    function setMyUint(uint _myUint) public {
      myUint = _myUint;
  }
  
  uint256 public yourUint = 245;
  
  function setYourUint(uint _yourUint) public {
      yourUint = _yourUint;
  }
  
  bool public myBool;

  function setMyBool(bool _myBool) public {
      myBool = _myBool;
  }

  address public myAddress;

  function setAddress(address _address) public {
      myAddress = _address;
  }

  function getBalanceOfAccount() public view returns(uint) {
      return myAddress.balance;
  }
  
  string public myString = 'Hello!';

  function setMyString(string memory _myString) public {
      myString = _myString;
  }
}