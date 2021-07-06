pragma solidity ^0.8.6;

contract Struct {
    
  struct Payment {
      uint amount;
      uint timestamp; // timestamps are uint - starting from 1970 - Unix timestamp
  }
  
  struct Balance {
      uint totalBalance;
      uint numPayments;
      mapping (uint => Payment) payments;
  }
  
  mapping(address => Balance) public balanceReceived;
  
  function getBalance() public view returns(uint) {
      return address(this).balance;
  }
  
  function sendMoney() public payable {
      balanceReceived[msg.sender].totalBalance += msg.value;
      
      Payment memory payment = Payment(msg.value, block.timestamp); // block.timestamp - to give us the current timestamp
      
      balanceReceived[msg.sender].payments[balanceReceived[msg.sender].numPayments] = payment;
      balanceReceived[msg.sender].numPayments++;
  }
  
  function withDrawMoney(address payable _to, uint _amount) public {
      require(balanceReceived[msg.sender].totalBalance >= _amount, "not enough funds!"); // check if the user has enough money in his balance 
      balanceReceived[msg.sender].totalBalance -= _amount; // decrease the amount in his balance, by the amount that he wants to send
      _to.transfer(_amount);
  }
  
  function withdrawAllMoney(address payable _to) public {
      uint balanceToSend = balanceReceived[msg.sender].totalBalance;
      balanceReceived[msg.sender].totalBalance = 0;
      _to.transfer(balanceToSend);
  } 
}