import { ethers } from "ethers";
import Image from "next/image";
import {  useEffect, useState } from "react";
import { mintSolContract } from "../mint";


const placeholderURI = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png"


function EmptyCard() {

  return (
    <div>
      <Image width={400} height={400} src={placeholderURI} alt="token image" />

    </div>
  )
}

export default function NFTCard({ tokenId}: any) {
  const ipfsFolderId = "QmUd1PB9HnhYzRBQXV4KtDH6zC4UWVxosHtZr7jVywhbpG"
  const baseURI = "https://gateway.pinata.cloud/ipfs/"
  const metadataURI = `${baseURI}${ipfsFolderId}/${tokenId}.json`
  const pinataURI = `${baseURI}${ipfsFolderId}/${tokenId}.jpg`
  const [isMinted, setIsMinted] = useState(false)

  useEffect(()=>{
    getIsMinted()
  },[])

  const getIsMinted = async () => {
    if(!mintSolContract) return;
    console.log({metadataURI});
    
    const isOwned = await mintSolContract.isURITaken(metadataURI)
    console.log({isOwned});
    
    setIsMinted(isOwned)
  }

  const mintToken =async () => {
    if(!mintSolContract) return;
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'});
    const address = accounts[0];
    const code = await mintSolContract.signer.provider!.getCode(address)
    console.log(metadataURI,code);
    
    const result = await mintSolContract.functions.payToMint(address, metadataURI, {value: ethers.utils.parseEther("0.05"), gasLimit: 300000})
    await result.wait()
    getIsMinted()
  }

  // if(isEmpty) return <EmptyCard />
  return (
    <div >
      <Image width={200} height={200} src={isMinted ? pinataURI: placeholderURI} alt="token image" />
      {isMinted ? (
        <span>
          Already minted
        </span>
      ):(
        <button onClick={mintToken}>
          Mint
        </button>
      )}
      Card {tokenId}

    </div>
  )
}