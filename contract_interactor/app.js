import Web3 from "web3";
import contractAbi from "./contracts/chinesewhiser.json";
import dotenv from "dotenv";

const establischContractConnection = () => {
  //Can be any rpcurl of any network in this case rinkeby will be used
  const rpcUrl =
    "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
  const web3 = new Web3(rpcUrl);
  //Contract needs to be deployed on the chosen network e.g: https://rinkeby.etherscan.io/address/0xb7f224fe9227ea920d1c6d9ab154f67003543252
  const contractAdress = "0xB7F224fe9227ea920D1C6d9ab154F67003543252";
  const contract = new web3.eth.Contract(contractAbi, contractAdress);
};

const main = () => {
  dotenv.config();
  const walletAdress = process.env.WALLET_ADRESS;
  const privateKey = process.env.PRIVATE_KEY;
  establischContractConnection();
};

main();
