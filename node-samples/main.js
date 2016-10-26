var request = require('request');
request.debug = true;

request.get('http://b2c.kenfeng.cn', function(err, resp, body) {
	//console.log(body);
});
