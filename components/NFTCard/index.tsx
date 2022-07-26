import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Image from "next/image";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useNFTs from "../../hooks/useNFTs";

const placeholderURI =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png";

export default function NFTCard({ tokenId, onMint }: any) {
  const { accounts, baseURI, ipfsFolderId, getIsMinted, mintToken } = useNFTs();
  const metadataURI = `${baseURI}${ipfsFolderId}/${tokenId}.json`;
  const pinataURI = `${baseURI}${ipfsFolderId}/${tokenId}.jpg`;
  const [isMinted, setIsMinted] = useState(false);

  const updateStatus = async () => {
    getIsMinted(metadataURI).then(setIsMinted);
  };

  useEffect(() => {
    updateStatus();
  }, []);

  useEffect(() => {
    updateStatus();
  }, [accounts, tokenId]);

  const onMintClick = async () => {
    await mintToken(metadataURI);
    await onMint();
    await updateStatus();
  };

  return (
    <Card sx={{ minWidth: 275, padding: 5 }}>
      <CardContent>
        <Image
          width={200}
          height={200}
          src={isMinted ? pinataURI : placeholderURI}
          alt="token image"
        />
      </CardContent>
      <CardActions>
        {isMinted ? (
          <span>Already minted</span>
        ) : (
          <Button onClick={onMintClick}>Mint</Button>
        )}
      </CardActions>

      <Typography>Card {tokenId}</Typography>
    </Card>
  );
}
