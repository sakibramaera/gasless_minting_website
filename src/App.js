import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import MyContract from "./NFTToken.json"; // Import the JSON artifact file
import WalletGenerator from "./components/WalletGenerator";
import SignatureGenerator from "./components/SignatureGenerator";
import NFTMinter from "./components/NFTmint";

function App() {
  const [deployedContractAddress, setDeployedContractAddress] = useState("");

  useEffect(() => {
    // Check if MetaMask is installed and connected
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
    } else {
      console.log("MetaMask is not installed!");
    }
  }, []);

  const deployContract = async () => {
    try {
      // Connect to MetaMask provider
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Load the contract ABI and bytecode
      const contractAbi = MyContract.abi;
      const contractBytecode = MyContract.bytecode;

      // Create a new contract instance
      const contractFactory = new ethers.ContractFactory(
        contractAbi,
        contractBytecode,
        signer
      );
      const deployedContract = await contractFactory.deploy();

      // Wait for the contract to be deployed and get its address
      await deployedContract.deployed();
      const deployedAddress = deployedContract.address;

      // Update the state with the deployed contract address
      setDeployedContractAddress(deployedAddress);
      alert("Contract deployed at: " + deployedAddress);
    } catch (error) {
      console.error("Error deploying contract:", error);
      alert("Error deploying contract: " + error.message);
    }
  };

  return (
    <div className="App" >
      <h1>Deploy Contract via MetaMask</h1>
      <button onClick={deployContract}>Deploy Contract</button>
      {deployedContractAddress && (
        <p>Contract deployed at: {deployedContractAddress}</p>
      )}
      <WalletGenerator />
      <SignatureGenerator />
      <NFTMinter contractAddress={deployedContractAddress} />
    </div>
  );
}

export default App;
