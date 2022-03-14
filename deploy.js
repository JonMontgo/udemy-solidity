const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require("fs").promises;
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

async function deploy(deployAccount, web3) {
  const result = await new web3.eth.Contract(interface)
    .deploy({
      data: bytecode,
      arguments: ["Hi there!"],
    })
    .send({ gas: "1000000", from: deployAccount });
  console.log("Contract deployed to", result.options.address);
  return result;
}

async function main() {
  const seed = env.ETHER_SEED.trimEnd().trimStart();
  const provider = new HDWalletProvider({
    mnemonic: seed,
    providerOrUrl:
      "https://ropsten.infura.io/v3/17d3ce195c8247a4b16219f98116a4be",
  });
  const web3 = new Web3(provider);
  const accounts = await web3.eth.getAccounts();
  const deployAccount = accounts[0];

  await deploy();

  provider.engine.stop();
}

main();
