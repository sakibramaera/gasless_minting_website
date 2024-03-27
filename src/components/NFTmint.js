import React, { useState } from "react";
import { ethers } from "ethers";
import MyContract from "../NFTToken.json";

const NFTMinter = ({ contractAddress }) => {
  const [toAddress, setToAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [name, setName] = useState("");
  const [signature, setSignature] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [error, setError] = useState(null);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, MyContract.abi, signer);

  const handleSafeMint = async () => {
    try {
      // // Connect to the Ethereum network using MetaMask
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // await provider.send("eth_requestAccounts", []);

      // // Get the signer from the provider
      // const signer = provider.getSigner();
      // console.log("Account:", await signer.getAddress());

      // // Create a contract instance using the contract address and ABI
      // const contract = new ethers.Contract(
      //   contractAddress,
      //   MyContract.abi,
      //   signer
      // );

      // Call the safeMint function with the required parameters
      const tx = await contract.safeMint(toAddress, tokenId, name, signature);

      // Wait for the transaction to be mined
      await tx.wait();

      setTransactionHash(tx.hash);
    } catch (error) {
      console.error("Error in safeMint:", error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Safe Mint NFT</h2>
      <label>To Address:</label>
      <input
        type="text"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
      />
      <br />
      <label>Token ID:</label>
      <input
        type="text"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <br />
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label>Signature:</label>
      <input
        type="text"
        value={signature}
        onChange={(e) => setSignature(e.target.value)}
      />
      <br />
      <button onClick={handleSafeMint}>Safe Mint</button>
      {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default NFTMinter;
