
var https = require('https');
var crypto = require('crypto');
var md5 = crypto.createHash('md5');
var d = format();

var rongyu = {
	account_sid:'8a48b5514f2b46d0014f2fb75cd00529',
	auth_token:'373805710ff545d6bb22ce732c7dc0e3',
	appid:'aaf98f894f2efdde014f2fb80ef000dc',
	phone:'18069422777'
};


var SigParameter = rongyu.account_sid + rongyu.auth_token + d;
var sig = md5.update(SigParameter).digest('hex');

var Authorization = new Buffer( rongyu.account_sid + ':' + d );

var postData = {						//请求包体
	"to":rongyu.phone,
	"appId":rongyu.appid,
	"templateId":'1',
	"datas":["5225","10"]
};

var content = JSON.stringify(postData);

var options = {						//统一请求包头
	hostname:'sandboxapp.cloopen.com',
	port:'8883',
	path:'/2013-12-26/Accounts/'+rongyu.account_sid+'/SMS/TemplateSMS?sig='+sig+'',
	method:'POST',
	agent: false,
	rejectUnauthorized:false,
	headers:{							
		'Accept':'application/json',
		'Content-Type':'application/json;charset=utf-8',
		'Content-Length':content.length,
		'Authorization':Authorization.toString('base64')
	}
};

var req = https.request(options,function(res){

	res.setEncoding('utf8');

	res.on('data',function(chunk){
		console.log( JSON.parse(chunk) );
	});

	res.on('end',function(){
		console.log('over');
	})

}).on('error', function(e) {

    console.log("Got error: " + e.message);
});

req.write(content);
req.end();

function format(){

	var date = new Date(),
		y = date.getFullYear(),
		M = date.getMonth() + 1,
		d = date.getDate(),
		h = date.getHours(),
		m = date.getMinutes(),
		s = date.getSeconds();

		m = m > 10 ? m : '0'+m;
		s = s > 10 ? s : '0'+s;

	return '' + y + M + d + h + m + s;
}


