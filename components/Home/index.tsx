import { useEffect, useState } from "react"
import { mintSolContract } from "../mint"
import NFTCard from "../NFTCard"




export default function HomeComponent() {
  const [mintedCount, setMintedCount] = useState(0)

  useEffect(()=>{
    getMintedCount()
  }, [])

  const getMintedCount = async () =>{
    const count = await mintSolContract!.count()
    console.log(mintSolContract?.signer)
    setMintedCount(parseInt(count))
  }

  return (
    <div style={{display: 'flex'}}>
      {Array(mintedCount +1).fill(0).map((_, idx) => (<NFTCard key={idx} tokenId={idx +1} />))}
    </div>
  )
}