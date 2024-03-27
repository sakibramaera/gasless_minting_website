import { ethers } from "ethers";

const SIGNING_DOMAIN_NAME = "SAKIB.WEB3";
const SIGNING_DOMAIN_VERSION = "1";

class SignHelper {
  constructor(contractAddress, chainId, signer) {
    this.contractAddress = contractAddress;
    this.chainId = chainId;
    this.signer = signer;
  }

  async createSignature(id, name) {
    const obj = { id, name };
    const domain = await this._signingDomain();
    const types = {
      web3Struct: [
        { name: "id", type: "uint256" },
        { name: "name", type: "string" },
      ],
    };
    const signature = await this.signer._signTypedData(domain, types, obj);
    return { ...obj, signature };
  }

  async _signingDomain() {
    if (this._domain != null) {
      return this._domain;
    }
    const chainId = await this.chainId;
    this._domain = {
      name: SIGNING_DOMAIN_NAME,
      version: SIGNING_DOMAIN_VERSION,
      verifyingContract: this.contractAddress,
      chainId,
    };
    return this._domain;
  }

  static async getSign(contractAddress, chainId, tokenId, name) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log({signer})
    await signer.getAddress();

    const lm = new SignHelper(contractAddress, chainId, signer);
    const voucher = await lm.createSignature(tokenId, name);
    return voucher;
  }
}

export default SignHelper;
