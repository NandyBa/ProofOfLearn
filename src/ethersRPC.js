const { ethers } = require("ethers");

class EthereumRpc {
  constructor(provider) {
    this.provider = provider;
  }

  async getChainId() {
    try {
      const ethersProvider = new ethers.BrowserProvider(this.provider);
      const networkDetails = await ethersProvider.getNetwork();
      return networkDetails.chainId;
    } catch (error) {
      return error;
    }
  }

  async getAccounts() {
    try {
      const ethersProvider = new ethers.BrowserProvider(this.provider);
      const signer = await ethersProvider.getSigner();
      const address = signer.getAddress();
      return await address;
    } catch (error) {
      return error;
    }
  }

  async getBalance() {
    try {
      const ethersProvider = new ethers.BrowserProvider(this.provider);
      const signer = await ethersProvider.getSigner();
      const address = signer.getAddress();
      const balance = ethers.formatEther(
        await ethersProvider.getBalance(address)
      );
      return balance;
    } catch (error) {
      return error;
    }
  }

  async sendTransaction() {
    try {
      const ethersProvider = new ethers.BrowserProvider(this.provider);
      const signer = await ethersProvider.getSigner();
      const destination = "0x40e1c367Eca34250cAF1bc8330E9EddfD403fC56";
      const amount = ethers.parseEther("0.001");
      const tx = await signer.sendTransaction({
        to: destination,
        value: amount,
        maxPriorityFeePerGas: "5000000000", // Max priority fee per gas
        maxFeePerGas: "6000000000000", // Max fee per gas
      });
      const receipt = await tx.wait();
      return receipt;
    } catch (error) {
      return error;
    }
  }

  async signMessage() {
    try {
      const ethersProvider = new ethers.BrowserProvider(this.provider);
      const signer = await ethersProvider.getSigner();
      const originalMessage = "YOUR_MESSAGE";
      const signedMessage = await signer.signMessage(originalMessage);
      return signedMessage;
    } catch (error) {
      return error;
    }
  }

  async getPrivateKey() {
    try {
      const privateKey = await this.provider.request({
        method: "eth_private_key",
      });
      return privateKey;
    } catch (error) {
      return error;
    }
  }
}

module.exports = EthereumRpc;
