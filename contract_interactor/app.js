import Web3 from "web3";
import contractAbi from "./contracts/chinesewhiser.json";
import dotenv from "dotenv";
import Tx from "ethereumjs-tx";

const establischContractConnection = () => {
  //Can be any rpcurl of any network in this case rinkeby will be used
  const rpcUrl =
    "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
  const web3 = new Web3(rpcUrl);
  //Contract needs to be deployed on the chosen network e.g: https://rinkeby.etherscan.io/address/0xb7f224fe9227ea920d1c6d9ab154f67003543252
  const contractAdress = "0xB7F224fe9227ea920D1C6d9ab154F67003543252";
  const contract = new web3.eth.Contract(contractAbi, contractAdress);
  return { web3, contract };
};

const runChangeOwner = async (
  web3,
  contract,
  walletAdress,
  privateKey,
  otherAdress,
  whisper
) => {
  const nonce = await web3.eth.getTransactionCount(walletAdress, "pending");
  const functionAbi = await contract.methods
    .changeOwner(otherAdress, whisper)
    .encodeABI();

  const txData = {
    chainId: 4,
    nonce: web3.utils.toHex(nonce),
    gasPrice: "0x3b9aca00",
    from: walletAdress,
    to: "0xf0A87F2113c2f06F5143D254B94A5D86F44419f3",
    value: "0x0",
    gas: "0x61a80",
    data: functionAbi,
  };

  sendRawTransaction(web3, txData, walletAdress, privateKey);
};

const runGetOwner = async (contract) => {
  const contractResponse = await contract.methods.getOwner().call();
  console.log(contractResponse);
};

const runGetWhisper = async (contract) => {
  const contractResponse = await contract.methods.getWhisper().call();
  console.log(contractResponse);
};

const sendRawTransaction = (web3, txData, walletAdress, privateKey) => {
  // get the number of transactions sent so far so we can create a fresh nonce
  const pkBuff = new Buffer(privateKey, "hex");
  web3.eth.getTransactionCount(walletAdress).then((txCount) => {
    const newNonce = web3.utils.toHex(txCount);
    const transaction = new Tx({ ...txData, nonce: newNonce });
    transaction.sign(pkBuff);
    const serializedTx = transaction.serialize().toString("hex");
    web3.eth
      .sendSignedTransaction("0x" + serializedTx)
      .on("transactionHash", (txHash) => {
        const transactionHash = txHash;
        console.log(transactionHash);
      });
  });
};

const main = (otherAdress, whisper) => {
  dotenv.config();
  const walletAdress = process.env.WALLET_ADRESS;
  const privateKey = process.env.PRIVATE_KEY;
  const { web3, contract } = establischContractConnection();
  // runChangeOwner(
  //   web3,
  //   contract,
  //   walletAdress,
  //   privateKey,
  //   otherAdress,
  //   whisper
  // );
  //runGetOwner(contract);
  runGetWhisper(contract);
};

main("0xC5E7B6AFcfB61FEaEf9d6a973f5487c7C8B742f6", "First Whisper");
