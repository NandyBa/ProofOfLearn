import { useEffect, useState } from "react"
import WalletAbstraction from "../WalletAbstraction"
import "./demo.css"

const Demo = () => {

    const [address, setAddress] = useState(null)

    const claimStarterPack = async () => {
        alert("Not implemented yet")
    }

    const onConnect = (address) => {
        setAddress(address)
    }

    useEffect(() => {
        // set up listener
        if(!address) return
        const dataPost = async () => {
            try {
              const response = await fetch("http://localhost:3001/set-aave-listener", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  address
                })
              });
          
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
          
              const data = await response.text();
              console.log(data); // Log the response data
            } catch (error) {
              console.error("Error:", error);
            }
          };
          
          dataPost();        
    }, [address])

    return (
        <>
            <WalletAbstraction onConnect={onConnect}>
                <h1>Aave experience</h1>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/Cu6zeJzxhik" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>(onboarding video)

                <p>You shoud see a new window open with Aave's dashboard at the right of this window. If you don't see it, check your browser's settings to allow pop-ups from this site and go back to previous page.</p>

                <b style={{fontSize: 24}}>The video show the process step by step. You can see it or follow the instructions below.</b>

                <h2>How to claim the starter pack</h2>
                <button onClick={()=>claimStarterPack()}>Click here to get the starter pack</button>
                <h2>How to deposit USDC on Aave</h2>
                <h3>Connect you using WalletConnect</h3>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/Cu6zeJzxhik" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>(step 1 video)
                <ol>
                    <li>Click on the "Connect Wallet" button at the top right of the page.</li>
                    <li>Select WalletConnect</li>
                    <li>Click on the square on the top right of the modal who should have a QR code inside. It will copy the WalletConnect code.</li>
                    <li>Click here and paste it</li>
                </ol>
                <h3>Switch to Polygon Mumbai</h3>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/Cu6zeJzxhik" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>(step 2 video)
                <ol>
                    <li>Click on the hamburger menu at the top left of the page.</li>
                    <li>Activate testnets: Click on the "Testnets" slider to activate testnets.</li>
                    <li>Go back to the dashboard: Click on the "Dashboard" button at the top left of the page.</li>
                    <li>Click on the arrow at the right of the "Ethereum Mainnet" button at the top right of the page.</li>
                    <li>Select "Polygon - Mumbai" in the dropdown menu.</li>
                </ol>
                <h3>Deposit USDC</h3>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/Cu6zeJzxhik" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>(step 2 video)
                <ol>
                    <li>Click on the "Supply" button at right of USDC</li>
                    <li>Enter the deposit amount: In the deposit form, type the amount of USDC you wish to deposit.</li>
                    <li>Click on the "Approve" button</li>
                    <li>Confirm approval (modal)</li>
                    <li>Click on the "Deposit" button</li>
                    <li>Confirm deposit (modal)</li>
                    <li>Wait for confirmation: Once confirmed, the transaction will be processed. This may take a few secondes.</li>
                    <li>Verify deposit: Once the transaction is confirmed, you can see your USDC deposit and the corresponding aUSDC (the token you receive that represents your deposit) in your Aave dashboard.</li>
                </ol>

            </WalletAbstraction>
        </>
    )

}

export default Demo