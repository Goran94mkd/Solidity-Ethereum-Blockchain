const ItemManager = artifacts.require("./ItemManager.sol");

contract("ItemManager", accounts => {
  it("It should let you create new Items.", async () => {
    const itemManagerInstance = await ItemManager.deployed();
    const name = "test item";
    const price = 1000;

    const result = await itemManagerInstance.createItem(name, price, { from: accounts[0] });
    assert.equal(result.logs[0].args._itemIndex, 0, "There should be one item index in there")
    const item = await itemManagerInstance.items(0);
    assert.equal(item._identifier, name, "The item has a different identifier");
  });

  it("Should show you is Item paid.", async () => {
    const itemManagerInstance = await ItemManager.deployed();
    const paid = 1
    const step = await itemManagerInstance.constructor.SupplyChainSteps.Paid

    assert.equal(step, paid, "Amount wasn't correctly sent to the recipient")
    console.log(step)
  });
});