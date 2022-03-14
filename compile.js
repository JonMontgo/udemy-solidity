const fs = require("fs");
const path = require("path");
const solc = require("solc");

// Get Source for contract
const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(inboxPath, "utf8");

// Form input to compiler
const compilerInput = {
  language: "Solidity",
  sources: {
    "Inbox.sol": {
      content: source,
    },
  },
  settings: {
    optimizer: { enabled: true },
    outputSelection: { "*": { "*": ["*"] } },
  },
};

const inboxContract = JSON.parse(solc.compile(JSON.stringify(compilerInput)))
  .contracts["Inbox.sol"]["Inbox"];

const inboxByteCodeHex = inboxContract.evm.bytecode.object;
const inboxABI = inboxContract.abi;

module.exports = {
  bytecode: inboxByteCodeHex,
  interface: inboxABI,
};
