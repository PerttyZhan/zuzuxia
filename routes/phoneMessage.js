
var http = require('http');
var crypto = require('crypto');
//生成密码的 md5 值
var md5 = crypto.createHash('md5');

var data ={
	to:'15757176843',
	appid:'8a48b55147b467900147b5619b430235',
	templateid:'3273',
	datas:,
	data:
};

var options = {
	method:'POST',
	host:'https://sandboxapp.cloopen.com',
	port:'8883',
	path:'/2013-12-26/Accounts/8a48b5514739760101474d497b7a07f5/SMS/TemplateSMS?sig={SigParameter}',
	headers:{
		'Accept':'application/json';
		'Content-Type':'application/json;charset=utf-8',
		'Content-Length':''
		'Authorization':

	}

}
