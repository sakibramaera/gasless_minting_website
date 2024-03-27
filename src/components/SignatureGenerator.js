import React, { useState } from "react";
import { ethers } from "ethers";
import SignHelper from "./SignHelper"; // Import the SignHelper class

function SignatureGenerator() {
const [contractAddress, setContractAddress] = useState("");
const [chainId, setChainId] = useState("");
const [tokenId, setTokenId] = useState("");
const [name, setName] = useState("");
const [signature, setSignature] = useState("");

  const generateSignature = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      // Call the getSign method from SignHelper with user input arguments
      const voucher = await SignHelper.getSign(
        contractAddress,
        chainId,
        tokenId,
        name,
        signer
      );
      setSignature(voucher.signature);
      console.log("Signature:", voucher.signature);
    } catch (error) {
      console.error("Error generating signature:", error);
    }
  };

  return (
    <div>
      <h1>Generate Signature</h1>
      <label>Contract Address:</label>
      <input
        type="text"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />
      <br />
      <label>Chain ID:</label>
      <input
        type="text"
        value={chainId}
        onChange={(e) => setChainId(e.target.value)}
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
      <button onClick={generateSignature}>Generate Signature</button>
      {signature && <p>Signature: {signature}</p>}
    </div>
  );
}

export default SignatureGenerator;
