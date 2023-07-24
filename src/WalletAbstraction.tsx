import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import "./WalletAbstraction.css";

// Plugins
import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin"


import RPC from "./web3RPC"; // for using web3.js
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

// Solana
import {
  SolanaPrivateKeyProvider,
  SolanaWallet,
} from "@web3auth/solana-provider";

// StarkEx and StarkNet
//@ts-ignore
import starkwareCrypto from "@starkware-industries/starkware-crypto-utils";


// Near
// import { keyStores, KeyPair, utils } from "near-api-js";
// Will address in future PR

//@ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ec as elliptic } from "elliptic";

import {
  WalletConnectV2Adapter,
  getWalletConnectV2Settings
} from "@web3auth/wallet-connect-v2-adapter"
import { MetamaskAdapter } from "@web3auth/metamask-adapter"
import { TorusWalletAdapter } from "@web3auth/torus-evm-adapter"

import config from "./config"

const clientId =
  "BEglQSgt4cUWcj6SKRdu5QkOXTsePmMcusG5EAoyjyOYKlVRjIF1iCNnMOTfpzCiunHRrMui8TIwQPXdkQ8Yxuk"; // get from https://dashboard.web3auth.io

function WalletAbstraction() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [torusPlugin, setTorusPlugin] = useState<TorusWalletConnectorPlugin | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        // ETH_Goerli
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x5",
            rpcTarget: "https://rpc.ankr.com/eth_goerli",
          },
          web3AuthNetwork: "cyan",
        });
        setWeb3auth(web3auth);

        const openloginAdapter = new OpenloginAdapter({
          loginSettings: {
            mfaLevel: "default",
          },
          adapterSettings: {
            whiteLabel: {
              name: "Your app Name",
              logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
              logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
              defaultLanguage: "en",
              dark: true, // whether to enable dark mode. defaultValue: false
            },
          },
        });
        web3auth.configureAdapter(openloginAdapter);

        await web3auth.initModal();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth" // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
          uiConfig: {
            appName: "W3A",
            appLogo: "https://web3auth.io/images/w3a-L-Favicon-1.svg", // Your App Logo Here
            theme: "light",
            loginMethodsOrder: [ "google", "twitter"],
            defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
            loginGridCol: 3,
            primaryButton: "externalLogin" // "externalLogin" | "socialLogin" | "emailLogin"
          },
          web3AuthNetwork: "cyan"
        })

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
              dark: false // whether to enable dark mode. defaultValue: false
            },
            mfaSettings: {
              deviceShareFactor: {
                enable: true,
                priority: 1,
                mandatory: true
              },
              backUpShareFactor: {
                enable: true,
                priority: 2,
                mandatory: false
              },
              socialBackupFactor: {
                enable: true,
                priority: 3,
                mandatory: false
              },
              passwordFactor: {
                enable: true,
                priority: 4,
                mandatory: false
              }
            }
          }
        })
        web3auth.configureAdapter(openloginAdapter)

        // plugins and adapters are optional and can be added as per your requirement
        // read more about plugins here: https://web3auth.io/docs/sdk/web/plugins/

        // adding torus wallet connector plugin

        const torusPlugin = new TorusWalletConnectorPlugin({
          torusWalletOpts: {},
          walletInitOptions: {
            whiteLabel: {
              theme: { isDark: true, colors: { primary: "#00a8ff" } },
              logoDark: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
              logoLight: "https://web3auth.io/images/w3a-D-Favicon-1.svg"
            },
            useWalletConnect: true,
            enableLogging: true
          }
        })
        console.log({ torusPlugin })
        setTorusPlugin(torusPlugin)
        await web3auth.addPlugin(torusPlugin)

        // read more about adapters here: https://web3auth.io/docs/sdk/web/adapters/

        // adding wallet connect v1 adapter
        // const walletConnectV1Adapter = new WalletConnectV1Adapter({
        //   adapterSettings: {
        //     bridge: "https://bridge.walletconnect.org",
        //   },
        //   clientId,
        // });

        // web3auth.configureAdapter(walletConnectV1Adapter);

        // adding wallet connect v2 adapter
        const defaultWcSettings = await getWalletConnectV2Settings(
          "eip155",
          [1, 137, 5],
          "04309ed1007e77d1f119b85205bb779d"
        )
        const walletConnectV2Adapter = new WalletConnectV2Adapter({
          adapterSettings: { ...defaultWcSettings.adapterSettings },
          loginSettings: { ...defaultWcSettings.loginSettings }
        })

        web3auth.configureAdapter(walletConnectV2Adapter)

        // adding metamask adapter
        const metamaskAdapter = new MetamaskAdapter({
          clientId,
          sessionTime: 3600, // 1 hour in seconds
          web3AuthNetwork: "cyan",
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth" // This is the public RPC we have added, please pass on your own endpoint while creating an app
          }
        })
        // we can change the above settings using this function
        metamaskAdapter.setAdapterSettings({
          sessionTime: 86400, // 1 day in seconds
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth" // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
          web3AuthNetwork: "cyan"
        })

        // it will add/update  the metamask adapter in to web3auth class
        web3auth.configureAdapter(metamaskAdapter)

        const torusWalletAdapter = new TorusWalletAdapter({
          clientId
        })

        // it will add/update  the torus-evm adapter in to web3auth class
        web3auth.configureAdapter(torusWalletAdapter)

        setWeb3auth(web3auth)

        await web3auth.initModal()

        setProvider(web3auth.provider)

        if (web3auth.connected) {
          setLoggedIn(true)
        }
      } catch (error) {
        console.error(error)
      }
    }

    init()
  }, [])

  const getAllAccounts = async () => {

    // Solana
    let solana_address;
    try {
      solana_address = await getSolanaAddress();
    } catch (error) {
      solana_address = "Solana JSON RPC Error";
    }
    // Others
    const starkex_address = await getStarkExAddress();
    const starknet_address = await getStarkNetAddress();
    // const near_address = await getNearAddress();

    uiConsole(
      "Solana Address: " + solana_address,
      "StarkEx Address: " + starkex_address,
      "StarkNet Address: " + starknet_address,
      // "Near Address: " + near_address
    );
  };

  const login = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    setLoggedIn(true);
  };

  const authenticateUser = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const idToken = await web3auth.authenticateUser();
    uiConsole(idToken);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    uiConsole(user);
  };

  const logout = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
  };

  const getAccounts = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    uiConsole("ETH Address: " + address);
  };

  const getBalance = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    uiConsole(balance);
  };

  const sendTransaction = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    uiConsole(receipt);
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    uiConsole(signedMessage);
  };

  const getBnbAddress = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();

    
  };

  const getSolanaAddress = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();

    const { getED25519Key } = await import("@toruslabs/openlogin-ed25519");
    const ed25519key = getED25519Key(privateKey).sk.toString("hex");

    // Get user's Solana's public address
    const solanaPrivateKeyProvider = new SolanaPrivateKeyProvider({
      config: {
        chainConfig: {
          chainId: "0x3",
          rpcTarget: "https://api.devnet.solana.com",
          displayName: "Solana Mainnet",
          blockExplorer: "https://explorer.solana.com/",
          ticker: "SOL",
          tickerName: "Solana",
        },
      },
    });
    await solanaPrivateKeyProvider.setupProvider(ed25519key);
    console.log(solanaPrivateKeyProvider.provider);

    const solanaWallet = new SolanaWallet(
      solanaPrivateKeyProvider.provider as any
    );
    const solana_address = await solanaWallet.requestAccounts();
    return solana_address[0];
  };


  const showWCM = async () => {
    if (!torusPlugin) {
      uiConsole("torus plugin not initialized yet")
      return
    }
    torusPlugin.showWalletConnectScanner()
    uiConsole()
  }

  // Will address this in future PR
  // const getNearAddress = async () => {
  //   if (!provider) {
  //     uiConsole("provider not initialized yet");
  //     return;
  //   }
  //   const rpc = new RPC(provider);
  //   const privateKey = await rpc.getPrivateKey();
  //   const keyPair = KeyPair.fromString(utils.serialize.base_encode(privateKey));
  //   const myKeyStore = new keyStores.InMemoryKeyStore();
  //   await myKeyStore.setKey("testnet", "web3auth-test-account.testnet", keyPair);
  //   const publicKey = utils.PublicKey.fromString(keyPair?.getPublicKey().toString());
  //   const address = Buffer.from(publicKey.data).toString("hex")
  //   return address;
  // };

  const getStarkExAddress = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    const keyPairStarkEx = starkwareCrypto.ec.keyFromPrivate(privateKey, "hex");
    const starkex_account = starkwareCrypto.ec.keyFromPublic(
      keyPairStarkEx.getPublic(true, "hex"),
      "hex"
    );
    const address = starkex_account.pub.getX().toString("hex");
    return address;
  };

  const getStarkNetAddress = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    const keyPairStarkNet = starkwareCrypto.ec.keyFromPrivate(
      privateKey,
      "hex"
    );
    const starknet_account = starkwareCrypto.ec.keyFromPublic(
      keyPairStarkNet.getPublic(true, "hex"),
      "hex"
    );
    const address = starknet_account.pub.getX().toString("hex");
    return address;
  };

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

  const loggedInView = (
    <>
      <a href="https://app.1inch.io/#/100/simple/swap/xDAI" target="_blank">1inch Website</a>
      <div className="flex-container">
        {/* <div>
          <button onClick={getUserInfo} className="card">
            Get User Info
          </button>
        </div>
        <div>
          <button onClick={authenticateUser} className="card">
            Get ID Token
          </button>
        </div>
        <div>
          <button onClick={getAccounts} className="card">
            Get ETH Account
          </button>
        </div>
        <div>
          <button onClick={getAllAccounts} className="card">
            Get All Accounts
          </button>
        </div> */}
        <div> 
          <button onClick={showWCM} className="card">
            Show Wallet Connect Modal
          </button>
        </div>
        {/* <div>
          <button onClick={getBalance} className="card">
            Get ETH Balance
          </button>
        </div>
        <div>
          <button onClick={sendTransaction} className="card">
            Send Transaction
          </button>
        </div>
        <div>
          <button onClick={signMessage} className="card">
            Sign Message
          </button>
        </div> */}
        <div>
          <button onClick={logout} className="card">
            Log Out
          </button>
        </div>
      </div>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );

  const unloggedInView = (
    <button onClick={login} className="card">
      Login
    </button>
  );

  return (
    <div className="container">
      <h1 className="title">
        <a target="_blank" href="http://web3auth.io/" rel="noreferrer">
          Web3Auth{" "}
        </a>
        & ReactJS Multi-chain Example
      </h1>

      <div className="grid">{loggedIn ? loggedInView : unloggedInView}</div>

    </div>
  );
}

export default WalletAbstraction;
