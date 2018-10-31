# Express-based REST API and a corresponding smart contract to register cars.

## Installation

- Make sure you have npm and node installed
- sudo npm install -g ganache-cli (_private ethereum blockchain_)
- sudo npm install -g truffle (_framework for testing and deploying contracts_)
- git clone https://github.com/Arkrait/testJob.git
- cd testJob
- npm install
- npm start

Now you can add accounts to Metamask via private codes supplied by ganache.

### Keypoints

- /api/register/:address should be restricted to admins
- probably need to refactor the requestRegistration function to be _payable_
- later on the whole API can be reformatted to use raw transactions for the ease-of-use from the MetaMask client
