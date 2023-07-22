import { useState, useEffect } from "react";
import config from "./config";

import logo from "./logo.svg";
import "./App.css";

import { Web3Auth } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
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

        console.log({ environment: config.environment })

        const openloginAdapter = new OpenloginAdapter({
          loginSettings: {
            mfaLevel: (config.environment === "development") ? 'none' : 'optional'
          },
          adapterSettings: {
            uxMode: "popup", // "redirect" | "popup"
            whiteLabel: {
              name: "Your app Name",
              logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
              logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
              defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
              dark: false, // whether to enable dark mode. defaultValue: false
            },
            mfaSettings: {
              deviceShareFactor: {
                enable: true,
                priority: 1,
                mandatory: true,
              },
              backUpShareFactor: {
                enable: true,
                priority: 2,
                mandatory: false,
              },
              socialBackupFactor: {
                enable: true,
                priority: 3,
                mandatory: false,
              },
              passwordFactor: {
                enable: true,
                priority: 4,
                mandatory: false,
              },
            },
          },
        });

        web3auth.configureAdapter(openloginAdapter);



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
