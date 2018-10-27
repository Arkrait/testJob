const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const Web3 = require("web3");
const ganache = require("");
const port = 8080;

const app = express();
const web3 = new Web3(Web3.givenProvider || "ws://localhost:30303");

app.listen(port, "127.0.0.1");
