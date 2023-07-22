const AggregationRouterV5Address = "0x1111111254EEB25477B68fb85Ed929f73A960582"


const didUse1inch = async (req, res) => {
    if(req.body.length < 1) return false;

    const { to, from, logs } = req.body[0];

    const used1inch = (to.toLowerCase() === AggregationRouterV5Address.toLowerCase());

    return used1inch;
}

module.exports = { didUse1inch }
