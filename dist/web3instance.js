"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
exports.default = web3;
//# sourceMappingURL=web3instance.js.map