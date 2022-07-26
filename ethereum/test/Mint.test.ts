import { expect } from "chai";
import hh, { ethers } from "hardhat";

const ETH005 = ethers.utils.parseEther("0.05")

describe("Mint", function () {
    const sampleContentURI = "abc"
    it("isURITaken", async function () {
    const Mint = await hh.ethers.getContractFactory("PMV");
    const mint = await Mint.deploy();


    await mint.markURIAsOwned(sampleContentURI)
    expect(await mint.isURITaken(sampleContentURI))
  });

  it("payToMint", async function () {
    const Mint = await hh.ethers.getContractFactory("PMV");
    const mint = await Mint.deploy();
    const [owner, {address: recipient}] = await ethers.getSigners();

    const balance = await mint.balanceOf(recipient)
    expect(balance).to.equal(0)

    const newTokenId = await mint.payToMint(recipient, sampleContentURI, {value: ETH005})

    await newTokenId.wait()

    const newBalance = await mint.balanceOf(recipient)
    expect(newBalance).to.equal(1)

    expect(await mint.isURITaken(sampleContentURI)) 
  });
});
