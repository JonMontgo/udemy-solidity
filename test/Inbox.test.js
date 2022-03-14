const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");

let accounts;
let deployAccount;
let inbox;
let initialMessage = "Hi there!";

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  deployAccount = accounts[0];
  inbox = await new web3.eth.Contract(interface)
    .deploy({
      data: bytecode,
      arguments: [initialMessage],
    })
    .send({ from: deployAccount, gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    console.log(`Deploying to address ${inbox.options.address}`);
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, initialMessage);
  });

  it("can set new message", async () => {
    const newMessage = "Changed";
    const receipt = await inbox.methods
      .setMessage(newMessage)
      .send({ from: deployAccount, gas: "1000000" });
    console.log(receipt);
    assert.equal(await inbox.methods.message().call(), newMessage);
  });
});
