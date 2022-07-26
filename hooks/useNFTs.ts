import { Contract, ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";


import PMV from "../ethereum/artifacts/contracts/Mint.sol/PMV.json"

const localContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const alchemyContractAddress = "0x958fA0D2Dcf1d62bd191a2b963f400c05f470255"

const useNFTs = () => {
  const ipfsFolderId = "QmUd1PB9HnhYzRBQXV4KtDH6zC4UWVxosHtZr7jVywhbpG";
  const baseURI = "https://gateway.pinata.cloud/ipfs/";

  const [mintedCount, setMintedCount] = useState(0);
  const [contract, setContract] = useState<Contract | null>(null)
  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    initContract()
  }, []);

  useEffect(() => {
    getMintedCount()
  }, [accounts]);

  async function initContract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setAccounts(accounts)

    const signer = provider.getSigner();

    setContract(new ethers.Contract(localContractAddress, PMV.abi, signer))
  }

  const getMintedCount = async () => {
    if (!contract) return;
    const count = await contract.count()
    console.log(contract.signer)
    setMintedCount(parseInt(count))
  }


  const getIsMinted = async (uri: string) => {
    if (!contract) return;
    console.log({ uri });

    const signerAddress = await contract.signer.getAddress();
    console.log({ signerAddress });

    return contract.isURITaken(uri);
  };

  const mintToken = async (uri: string) => {
    if (!contract) return;
    const address = accounts[0];
    const code = await contract.signer.provider!.getCode(address);
    console.log(uri, code);

    const options = { value: ethers.utils.parseEther("0.05"), gasLimit: 300000 }
    const result = await contract.functions.payToMint(address, uri, options);
    console.log({ result });
    await result.wait();
    console.log("result wait");
    await getMintedCount()
    console.log("getMintedCount");
  };

  return {
    accounts,
    mintedCount,
    ipfsFolderId,
    baseURI,
    getMintedCount,
    getIsMinted,
    mintToken
  };
};

export default useNFTs;
