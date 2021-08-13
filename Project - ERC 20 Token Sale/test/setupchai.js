"use strict"
let chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require('chai-bn')(BN);
let chaiAsPromised = require("chai-as-promised");

chai.use(chaiBN);
chai.use(chaiAsPromised);
module.exports = chai;