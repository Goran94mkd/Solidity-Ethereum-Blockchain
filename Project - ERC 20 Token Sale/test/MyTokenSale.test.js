const TokenSale = artifacts.require('MyTokenSale')
const Token = artifacts.require('MyToken');
const KycContract = artifacts.require("KycContract");

const chai = require('./setupchai.js');;
const BN = web3.utils.BN;
const expect = chai.expect;

require('dotenv').config({ path: '../.env' });

contract('TokenSale Test', async (accounts) => {
  const [initialHolder, recipient, anotherAccount] = accounts 

  it('should not have any tokens in my initialHolder Account', async () => {
    let instance = await Token.deployed()
    return expect(
      instance.balanceOf(initialHolder),
    ).to.eventually.be.a.bignumber.equal(new BN(0))
  })

  it('all tokens should be in the TokenSale SC by default', async () => {
    let instance = await Token.deployed()
    let balanceOfTokenSaleSC = await instance.balanceOf(TokenSale.address)
    let totalSupply = await instance.totalSupply()
    expect(balanceOfTokenSaleSC).to.be.a.bignumber.equal(totalSupply)
  })

  it('should be possible to buy one token by simply sending ether to the smart contract', async () => {
    let tokenInstance = await Token.deployed()
    let tokenSaleInstance = await TokenSale.deployed()
    let balanceBeforeAccount = await tokenInstance.balanceOf.call(recipient) 

    await expect(tokenSaleInstance.sendTransaction({from: recipient, value: web3.utils.toWei("1", "wei")})).to.be.rejected;
    await expect(balanceBeforeAccount).to.be.bignumber.equal(await tokenInstance.balanceOf.call(recipient));

    let kycInstance = await KycContract.deployed();
    await kycInstance.setKycCompleted(recipient); 
    await expect(tokenSaleInstance.sendTransaction({from: recipient, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;
    return expect(balanceBeforeAccount + 1).to.be.bignumber.equal(await tokenInstance.balanceOf.call(recipient));
  })
})
