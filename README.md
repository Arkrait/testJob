# Express-based REST API and a corresponding smart contract to register cars.

## Installation

- Make sure you have npm and node installed
- sudo npm install -g ganache-cli (_private ethereum blockchain_)
- sudo npm install -g truffle (_framework for testing and deploying contracts_)
- git clone https://github.com/Arkrait/testJob.git
- cd testJob
- npm install
- npm start

_NOTE_ **the first request will not go through if the contract is not yet deployed**
This is not a problem in production because the contract is already deployed in such cases, to the extent of my knowledge

### Keypoints

- /api/register/:address should be restricted to admins
- probably need to refactor the requestRegistration function to be _payable_
- later on the whole API can be reformatted to use raw transactions for the ease-of-use from the MetaMask client
