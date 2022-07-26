// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PMV is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    mapping(string => bool) existingURIs;

    modifier withPayment(){
      require(msg.value >= 0.05 ether, "You need to pay");
      _;
    }

    constructor() ERC721("P.M.V", "PMV") {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function payToMint(address recipient, string memory contentURI)  public payable withPayment onlyOwner returns (uint256){
      require(isURITaken(contentURI) == false);

        uint256 newItemId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        markURIAsOwned(contentURI);

        _safeMint(recipient, newItemId);
        _setTokenURI(newItemId, contentURI);

        return newItemId;
    }

    function markURIAsOwned(string memory contentURI) public  {
      existingURIs[contentURI] = true;
    }

    function isURITaken(string memory contentURI)public view returns (bool){
      return existingURIs[contentURI] == true;
    }

    function count()public view returns (uint256){
      return _tokenIdCounter.current();
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
