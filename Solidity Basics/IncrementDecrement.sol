pragma solidity ^0.8.6;
    
contract IncrementDecrement {
  
  uint8 public myUint8;

  function decrement() public {
      myUint8--;
  }

  function increment() public {
      myUint8++;
  }
}