import React, { Component } from "react";
import ItemManager from "./contracts/ItemManager.json";
import Item from "./contracts/Item.json";
import getWeb3 from "./getWeb3";
import "./App.css";

class App extends Component {
  state = { cost: 0, itemName: "exampleItem1", loaded: false };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await this.web3.eth.net.getId();

      this.itemManager = new this.web3.eth.Contract(
        ItemManager.abi,
        ItemManager.networks[networkId] && ItemManager.networks[networkId].address,
      );
      this.item = new this.web3.eth.Contract(
        Item.abi,
        Item.networks[this.networkId] && Item.networks[this.networkId].address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.listenToPaymentEvent();
      this.setState({ loaded:true });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  listenToPaymentEvent = () => {
    let self = this;
    this.itemManager.events.SupplyChainStep().on("data", async function(evt) {
      if(evt.returnValues._step == 1) {
        let item = await self.itemManager.methods.items(evt.returnValues._itemIndex).call();
        console.log(item);
        alert("Item " + item._identifier + " was paid, deliver it now!");
      };
      console.log(evt);
    });
  }


  handleSubmit = async () => {
    const { cost, itemName } = this.state;
    let result = await this.itemManager.methods.createItem(itemName, cost).send({ from: this.accounts[0] });

    alert(`Your Item: ${itemName} has been successfully created !`)
    console.log(`${itemName} price: ${cost}`);

    alert("Send " + cost + " Wei to address: " + result.events.SupplyChainStep.returnValues._itemAddress);
    console.log(result);
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Supply Chain!</h1>
        <h2>Items</h2>
        <h4>Price:  <input type="text" name="cost" value={this.state.cost} onChange={this.handleInputChange} /></h4>
        <h4>Name: <input type="text" name="itemName" value={this.state.itemName} onChange={this.handleInputChange} /></h4>
        <button type="button" onClick={this.handleSubmit}>Create new Item</button>
      </div>
    );
  }
}

export default App;
