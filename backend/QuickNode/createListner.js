const fetch = require("node-fetch");
const headers = require('./QuickNodeRequestHeader')

const wallet_address = '0x39F606E112748C62EbA89db5b1934bcd339db5cc'
const expression = `(tx_to == '${wallet_address}') || (tx_from == '${wallet_address}')`
const network = 'gnosis-mainnet'
const destinationId = '046e520f-0ea8-4b6a-9067-63fa2a938a14'


var expressionBase64 = Buffer.from(expression).toString('base64')

var requestOptions = {
	method: 'POST',
	headers,
	redirect: 'follow',
	body: JSON.stringify({
		name: 'My Notification',
		expression: expressionBase64,
		network,
		destinationIds: [destinationId],
	}),
}

fetch(
	'https://api.quicknode.com/quickalerts/rest/v1/notifications',
	requestOptions
)
	.then(response => response.text())
	.then(result => console.log(result))
	.catch(error => console.log('error', error))

