const Token = artifacts.require('MyToken')

const chai = require('./setupchai.js')
const BN = web3.utils.BN
const expect = chai.expect

require('dotenv').config({ path: '../.env' })

contract('Token Test', async (accounts) => {
  const [initialHolder, recipient, anotherAccount] = accounts

  beforeEach(async () => {
    this.MyToken = await Token.new(process.env.INITIAL_TOKENS)
  })

  it('All tokens should be in my account', async () => {
    let instance = this.MyToken
    let totalSupply = await instance.totalSupply()

    return await expect(
      instance.balanceOf(initialHolder),
    ).to.eventually.be.a.bignumber.equal(totalSupply)
  })

  it('I can send tokens from Account 1 to Account 2', async () => {
    const sendTokens = 1
    let instance = this.MyToken
    let totalSupply = await instance.totalSupply()
    await expect(
      instance.balanceOf(initialHolder),
    ).to.eventually.be.a.bignumber.equal(totalSupply)
    await expect(instance.transfer(recipient, sendTokens)).to.eventually.be
      .fulfilled
    await expect(
      instance.balanceOf(initialHolder),
    ).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)))
    return await expect(
      instance.balanceOf(recipient),
    ).to.eventually.be.a.bignumber.equal(new BN(sendTokens))
  })

  it("It's not possible to send more tokens than account one has", async () => {
    let instance = this.MyToken
    let balanceOfDeployer = await instance.balanceOf(initialHolder)
    await expect(instance.transfer(recipient, new BN(balanceOfDeployer + 1))).to
      .eventually.be.rejected

    return await expect(
      instance.balanceOf(initialHolder),
    ).to.eventually.be.a.bignumber.equal(balanceOfDeployer)
  })
})
