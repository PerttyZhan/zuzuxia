

var crypto=require('crypto');

//生成密码的 md5 值
var md5 = crypto.createHash('md5'),
	password = md5.update('sense').digest('hex');

console.log( password );