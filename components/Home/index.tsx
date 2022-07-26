import { useEffect, useState } from "react";
import useNFTs from "../../hooks/useNFTs";
import { mintSolContract } from "../mint";
import NFTCard from "../NFTCard";

export default function HomeComponent() {
  const { mintedCount, getMintedCount } = useNFTs();
  console.log({ mintedCount });

  const refresh = async () => {
    await getMintedCount();
  };

  return (
    <div style={{ display: "flex" }}>
      {Array(mintedCount + 1)
        .fill(0)
        .map((_, idx) => (
          <NFTCard key={idx} onMint={refresh} tokenId={idx + 1} />
        ))}
    </div>
  );
}
