const { QuickNode_Webhook_Url } = require('../config')
const fetch = require("node-fetch");
const headers = require('./QuickNodeRequestHeader')

var requestOptions = {
	method: 'POST',
	headers,
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
