import Web3 from "web3";
import contractAbi from "./contracts/chinesewhiser.json";
import dotenv from "dotenv";
import Tx from "ethereumjs-tx";

const establischContractConnection = (contractAdress) => {
  //Can be any rpcurl of any network in this case rinkeby will be used
  const rpcUrl =
    "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
  const web3 = new Web3(rpcUrl);
  //Contract needs to be deployed on the chosen network e.g: https://rinkeby.etherscan.io/address/0xb7f224fe9227ea920d1c6d9ab154f67003543252
  const contract = new web3.eth.Contract(contractAbi, contractAdress);
  return { web3, contract };
};

const runChangeOwner = async (
  web3,
  contract,
  contractAdress,
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
    to: contractAdress,
    value: "0x0",
    gas: "0x61a80",
    data: functionAbi,
  };

  sendRawTransaction(web3, txData, walletAdress, privateKey);
};

const runGetOwner = async (contract) => {
  contract.methods
    .getOwner()
    .call()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const runGetWhisper = async (contract, walletAdress) => {
  contract.methods
    .getWhisper()
    .call({ from: walletAdress })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err.message);
    });
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
        console.log("Transcation is done at: " + transactionHash);
      });
  });
};

const main = (otherAdress, whisper) => {
  dotenv.config();
  const walletAdress = process.env.WALLET_ADRESS;
  const privateKey = process.env.PRIVATE_KEY;
  const contractAdress = process.env.CONTRACT_ADRESS;
  const { web3, contract } = establischContractConnection(contractAdress);
  // runChangeOwner(
  //   web3,
  //   contract,
  //   contractAdress,
  //   walletAdress,
  //   privateKey,
  //   otherAdress,
  //   whisper
  // );
  //runGetOwner(contract);
  //runGetWhisper(contract, walletAdress);
};

main("0xd71dE4e6609C4Bf20B589DF33b318eAa80A23956", "Second Whisper");
