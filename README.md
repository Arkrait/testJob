# Express-based REST API and a corresponding smart contract to register cars.

[![Build Status](https://travis-ci.com/Arkrait/testJob.svg?branch=tests)](https://travis-ci.com/Arkrait/testJob)

## Installation

- Make sure you have npm and node installed
- sudo npm install -g ganache-cli (_private ethereum blockchain_)
- sudo npm install -g truffle (_framework for testing and deploying contracts_)
- git clone https://github.com/Arkrait/testJob.git
- cd testJob
- npm install
- npm run build
- npm run test _**MAKE SURE YOU HAVE GANACHE RUNNING BEFORE RUNNING TESTS (ganache-cli -u 0 -d)**_
- npm start

### Keypoints

- /api/register/:address should be restricted to admins
- probably need to refactor the requestRegistration function to be _payable_
- later on the whole API can be reformatted to use raw transactions for the ease-of-use from the MetaMask client
