import WalletAbstraction from "../WalletAbstraction"
import "./demo.css"

const LaunchAaveDemo = () => {

    function openWindows() {
        const screenWidth = window.screen.availWidth;
        const windowHeight = window.screen.availHeight;

        // Calculate the width and height for each window
        const windowWidth = screenWidth / 2;

        // URL for the second window
        const secondWindowUrl = "http://app.aave.com";

        // Features for both windows
        const windowFeatures = `width=${windowWidth},height=${windowHeight},top=0,left=0`;
        
        // Open the first window
        const window1 = window.open("http://localhost:3000/wallet-abstraction", "_blank", windowFeatures);

        // Open the second window with the specified URL
        const window2 = window.open(secondWindowUrl, "_blank", windowFeatures);

        // Move the windows next to each other
        if (window1 && window2) {
            window1.moveTo(0, 0);
            window2.moveTo(windowWidth, 0);
        }
    }

    return (
        <button className="demo-button" onClick={openWindows}>Launch demo</button>
    )

}

export default LaunchAaveDemo