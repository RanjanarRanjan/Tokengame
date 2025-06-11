import { useState } from "react";
import { ethers } from "ethers";
import contractABI from "../src/assets/ClickToken.json";

const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // 🔁 Replace with real one

function App() {
  const [account, setAccount] = useState(null);
  const [status, setStatus] = useState("");

  async function connectWallet() {
    if (!window.ethereum) return alert("Install MetaMask!");
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setAccount(accounts[0]);
  }

  async function mintToken() {
    if (!window.ethereum) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);

    try {
      const tx = await contract.mintToken();
      setStatus("Minting in progress...");
      await tx.wait();
      setStatus("✅ Token minted!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Error occurred");
    }
  }

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>🎮 Click Token Game</h1>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <>
          <p>Connected: {account}</p>
          <button onClick={mintToken}>Generate Token</button>
        </>
      )}
      <p>{status}</p>
    </div>
  );
}

export default App;
