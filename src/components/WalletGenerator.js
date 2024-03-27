// src/WalletGenerator.js
import React, { useState } from "react";
import { ethers } from "ethers";

const WalletGenerator = () => {
  const [wallets, setWallets] = useState([]);

  const generateWallets = () => {
    let newWallets = [];
    for (let i = 0; i < 5; i++) {
      const wallet = ethers.Wallet.createRandom();
      newWallets.push(wallet);
    }

    setWallets(newWallets);
  };

  return (
    <div>
      <h1>Create 5 Crypto Wallets with 0 Balance</h1>
      <button onClick={generateWallets}>Generate Wallets</button>
      <div>
        {wallets.map((wallet, index) => (
          <div key={index}>
            <p>
              <strong>Wallet Address:</strong> {wallet.address}
            </p>
            <p><strong>Private Key:</strong> {wallet.privateKey}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletGenerator;
