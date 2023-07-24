require("dotenv").config();
const { ethers } = require("ethers");
const abi = require("./abi/AssetContractShared.json");

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const API_URL = process.env.API_URL;

const CONTRACT_ADDRESS = "0x2953399124F0cBB46d2CbACD8A89cF0599974963";
const AddressToCheck = "0x5029e6F712d6d981CE3300aCC5Ce55295BFb049F";
const tokenID = "36259062679067818707466419623673941435944165860598866691712086376795791687681";

const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
const contractWithSigner = contract.connect(signer);

check(contractWithSigner);

async function check(contract) {
  let amount = (await contract.balanceOf(AddressToCheck, tokenID)).toNumber();
  console.log(amount);
}
