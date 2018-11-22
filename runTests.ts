import * as path from "path";
import * as Mocha from "mocha";

function parseAccounts(accounts) {
  function splitAccount(account) {
    account = account.split(',')
    return {
      secretKey: account[0],
      balance: account[1]
    };
  }

  if (typeof accounts === 'string')
    return [splitAccount(accounts)];
  else if (!Array.isArray(accounts))
    return;

  var ret = []
  for (var i = 0; i < accounts.length; i++) {
    ret.push(splitAccount(accounts[i]));
  }
  return ret;
}

const options = {
  port: 8545,
  hostname: "127.0.0.1",
  seed: "TestRPC is awesome!",
  total_accounts: 10
}

const ganache = require("ganache-cli");
const mocha = new Mocha();
const BN = require("bn.js");

process.on('uncaughtException', function (e) {
  console.log(e.stack);
  process.exit(1);
});
const server = ganache.server(options);
server.listen(options.port, options.hostname, function (err, result) {
  if (err) {
    console.log(err);
    return;
  }
  var state = result ? result : server.provider.manager.state;

  console.log("");
  console.log("Available Accounts");
  console.log("==================");

  var accounts = state.accounts;
  var addresses = Object.keys(accounts);

  addresses.forEach(function (address, index) {
    var balance = new BN(accounts[address].account.balance).divRound(new BN("1000000000000000000")).toString();
    var line = "(" + index + ") " + address + " (~" + balance + " ETH)";

    if (state.isUnlocked(address) == false) {
      line += " 🔒";
    }

    console.log(line);
  });

  console.log("");
  console.log("Private Keys");
  console.log("==================");

  addresses.forEach(function (address, index) {
    console.log("(" + index + ") " + "0x" + accounts[address].secretKey.toString("hex"));
  });

  console.log("");
  console.log("Listening on " + options.hostname + ":" + options.port);

  mocha.addFile(__dirname + "/app/common/models/car.spec.ts");
  mocha.run(failures => {
    process.exitCode = failures ? 1 : 0;
    console.log(process.exitCode);
    process.exit();
  })
});
