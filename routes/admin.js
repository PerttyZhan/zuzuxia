
var managerAdmin = require('../models/managerAdmin');

//工具
var crypto = require('crypto');
var Promise = require('promise');
var Q = require('q');

var admin = {
	loginin:function(req,res){

		var user = JSON.parse( decodeURIComponent(req.body.data) ),deferred;

		var promise = function(){
			deferred = Q.defer();
			managerAdmin.isOnlyByUsername(user.username,function(err,count){
				if( !count ){
					return res.send({
								msg:'no',
								val:'账号不存在'
							});
				}else{
					return deferred.resolve();
				}
			});
			return deferred.promise;
		}
		promise().
				then(function(){
					
					var md5 = crypto.createHash('md5');
					user.password = md5.update( user.password ).digest('hex');

					managerAdmin.regPassAndUsername(user.username,user.password,function(err,count){
						if( err ){
							return console.log(err);
						}
						if( count ){
							req.session.managerUser = user;
							return res.send({
								msg:'yes',
								val:''
							});
						}else{
							return res.send({
								msg:'no',
								val:'密码不对'
							});
						}
					});
				});

	}
};

module.exports = admin;