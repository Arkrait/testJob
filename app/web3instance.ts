import Web3 = require("web3");
const ganache = require("ganache-cli");
const web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8545"));

export default web3;
