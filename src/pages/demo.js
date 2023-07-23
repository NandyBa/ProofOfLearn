import WalletAbstraction from "../WalletAbstraction"
import "./demo.css"

const Demo = () => {

    return (
        <div
            style={{
                display: 'flex',
            }}
        >
            <div
                style={{
                    width: '50%',
                }}
            >
                <WalletAbstraction />
            </div>
            
            <div class="iframe-container">
                {/* <iframe src="https://nouns.wtf" width="50%" allow="clipboard-read; clipboard-write"></iframe> */}
                <iframe src="https://curve.fi/#/gnosis/swap" width="50%" allow="clipboard-read; clipboard-write"></iframe>
                {/* <iframe src="https://app.aave.com" width="50%" allow="clipboard-read; clipboard-write"></iframe> */}
                {/* <iframe src="https://app.sushi.com" width="50%" allow="clipboard-read; clipboard-write"></iframe> */}
            </div>
            
        </div>
            
    )

}

export default Demo