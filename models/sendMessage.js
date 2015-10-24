
var http = require('http');
var querystring = require('querystring');

var postData = {
	uid:'TEVYbuIvSzn1',
	pas:'vvnwc6pw',
	mob:'15757176843',
	con:'【青年颂】您的验证码是：610912，3分钟内有效。如非您本人操作，可忽略本消息',
	type:'json'
};

var content = querystring.stringify(postData);

var options = {
	host:'api.weimi.cc',
	path:'/2/sms/send.html',
	method:'POST',
	agent:false,
	rejectUnauthorized:false,
	headers:{
		'Content-Type':'application/x-www-form-urlencoded',
		'Content-Length':content.length
	}
};

var req = http.request(options,function(res){

	res.setEncoding('utf8');
	res.on('data',function(chunk){

		console.log( JSON.parse(chunk) );
	});

	res.on('end',function(){
		console.log('over');
	})
});

req.write(content);
req.end();