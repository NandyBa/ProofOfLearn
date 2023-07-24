const fetch = require("node-fetch");
const headers = require('./QuickNodeRequestHeader')

const wallet_address = '0x39F606E112748C62EbA89db5b1934bcd339db5cc'
const expression = `(tx_to == '${wallet_address}') || (tx_from == '${wallet_address}')`
const network = 'gnosis-mainnet'
const destinationId = '91ee4250-4baa-4f7b-a392-60bd8024f27e'


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

