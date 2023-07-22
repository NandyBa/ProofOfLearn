const { QuickNode_API_Key, QuickNode_Webhook_Url } = require('../config')
const fetch = require("node-fetch");

var myHeaders = new Object()
myHeaders['Accept'] = 'application/json'
myHeaders['Content-Type'] = 'application/json'
myHeaders['x-api-key'] = QuickNode_API_Key

console.log({QuickNode_API_Key})

var requestOptions = {
	method: 'POST',
	headers: myHeaders,
	redirect: 'follow',
	body: JSON.stringify({
		name: 'My Destination name',
		to_url: QuickNode_Webhook_Url,
		webhook_type: 'POST',
		service: 'webhook',
		payload_type: 1,
	}),
}

fetch(
	'https://api.quicknode.com/quickalerts/rest/v1/destinations',
	requestOptions
)
	.then(response => response.text())
	.then(result => console.log(result))
	.catch(error => console.log('error', error))
