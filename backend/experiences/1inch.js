const AggregationRouterV5Address = "0x1111111254EEB25477B68fb85Ed929f73A960582";


const didUse1inch = async (req, res) => {
    if(req.body === undefined ) return false;

    const { transactions } = req.body;

    use1inch = false;

    transactions.forEach((tx) => {
        if(tx.to.toLowerCase() === AggregationRouterV5Address.toLowerCase()) {
            use1inch = true;
        }
    });

    return use1inch;
}

module.exports = { didUse1inch }
