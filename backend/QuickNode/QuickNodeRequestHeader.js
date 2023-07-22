const { QuickNode_API_Key } = require('../config')

var headers= new Object();
headers['Accept'] = 'application/json';
headers['Content-Type'] = 'application/json';
headers['x-api-key'] = QuickNode_API_Key;

module.exports = headers;
