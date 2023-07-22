import { useState, useEffect } from "react";

import logo from "./logo.svg";
import "./App.css";

import { Web3Auth } from "@web3auth/modal";
import { ethers } from "ethers";

const clientId = "BBCluKKdR0tIurM4SDit4P6Ww4X2W0nJrcTCPm0W_JZyWPlNf-sIsP4lkVu8QFgCnddKcqsLkG6EvKtiuqgmTZE"; // get from https://dashboard.web3auth.io

function App() {
  const [web3auth, setWeb3auth] = useState();
  const [provider, setProvider] = useState();

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          web3AuthNetwork: "testnet", // mainnet, aqua,  cyan or testnet
          chainConfig: {
            chainNamespace: "eip155",
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
        });

        setWeb3auth(web3auth);

        await web3auth.initModal();

        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={login}>Login</button>
      </header>
    </div>
  );
}

export default App;
