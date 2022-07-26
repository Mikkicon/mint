import { ethers } from "ethers"
import PMV from "../ethereum/artifacts/contracts/Mint.sol/PMV.json"

const localContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const alchemyContractAddress = "0x958fA0D2Dcf1d62bd191a2b963f400c05f470255"


function getMintContract( ) {
  if( typeof window !== "undefined" && window.ethereum){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    window.ethereum.request({ method: "eth_requestAccounts" });

    const signer = provider.getSigner();
    
    return new ethers.Contract(alchemyContractAddress, PMV.abi, signer)

  }
  return null
}

function getSigner( ) {
  if( typeof window !== "undefined" && window.ethereum){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return signer
  }
  return null
}

const signer =  getSigner()
const mintSolContract =  getMintContract()

export {mintSolContract, signer}