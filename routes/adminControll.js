
/*
	用户登录，注册，忘记密码,更新
*/
var adminModel = require('../models/admin');
var personInfoModel = require('../models/personInfo');
var settings = require('../settings');

var mailSend = require('../models/sendEmail');
var Promise = require('promise');
var Q = require('q');
var crypto = require('crypto');
var URL = require('url');
var oAuth = require('wechat-oauth');
var client = new oAuth(settings.wx.app_id,settings.wx.app_secret);

module.exports = function(app){
	app.route('/admin/login')
		.post(function(req,res){

			var user = {
				username:req.body.username,
				password:req.body.password
			};
			//生成密码的 md5 值
			var md5 = crypto.createHash('md5');
			user.password = md5.update( user.password ).digest('hex');

			adminModel.valiUsernameAlive(user.username,function(err,count){

				if( count ){
				
					adminModel.valiUsernameIsRight(user,function(err,user){
						
						if( user.length ){

							delete req.session.user;
							req.session.user = user[0];


							return res.send({'err':'','yes':'/loginAfter'});
						}
						return res.send({'err':'用户密码不对','yes':''});
					});
				}else{
					return res.send({'err':'此账号不存在','yes':''});
				}
			});
		});
	app.route('/admin/register')
		.post(function(req,res){


			var params = req.body || req.params,
				deferred,
				user = {
					username:params.username,
					password:params.password,
					registerBy:params.registerBy
				},personInfo,md5;

			if( user.registerBy == '邮箱' ){
				user.email = params.username;
			}else{
				user.phone = params.username;
			}

			//生成密码的 md5 值
			md5 = crypto.createHash('md5'),
			user.password = md5.update( user.password ).digest('hex');

			var promise = function(){
				deferred = Q.defer();
				adminModel.findRegisterIsOne(user.username,function(err,count){	
					if( !count ){
						deferred.resolve();
					}else{
						return res.send({
							msg:'no',
							val:'账号已存在'
						})
					}
				});

				return deferred.promise;
			};

			promise().then(function(){

				
				deferred = Q.defer();
				personInfo = new personInfoModel({
					name:user.username
				});


				personInfo.save(function(err,person){
					if( err ){
						return console.errord( err );
					}


					deferred.resolve(person);
				});
				return deferred.promise;
			}).then(function(data){


				var admin = new adminModel({
					username:user.username,
					password:user.password,
					registerBy:user.registerBy,
					nameID:data._id
				});

				admin.save(function(err,admin){

					if(err){
						return conole.error( err );
					}
					delete req.session.user;

					admin.nameID = data;

					req.session.user = admin;


					return res.send({
						msg:'yes',
						val:''
					});
				});
			});


		});
	app.route('/admin/loginOut')
		.get(function(req,res){

			delete req.session.user;
			res.send('yes')
		});

	app.route('/admin/resetPass')
		.post(function(req,res){
			var username = req.body.username;
			 var pass = req.body.password;

			 var md5 = crypto.createHash('md5'),
					pass = md5.update( pass ).digest('hex');
			adminModel.valiUsernameAlive(username,function(err,count){

				if(count){

					adminModel.resetPassword(username,pass,function(err,admin){

						if(err){return console.log(err);}

						adminModel.findPersonByUsername(username,function(err,user){

							delete req.session.user;
							req.session.user = user[0];
							return res.send({
								msg:'yes',
								val:''
							});

						});
						
					});
				}else{
					return res.send({
						msg:'no',
						val:'账号不存在'
					});
				}
			});
			


		});

	app.route('/pc/sendMessage')
		.post(function(req,res){

			var _src= req.body.src;

			var random = '';

			for( var i=0;i<6;i++){
				random += Math.floor( Math.random()*10 );
			}
			var mail = mailSend(_src,random);

			console.log( _src + '|' + random );
			mail.transport.sendMail(mail.options, function(error, response){
			    if(error){
			        console.log(error);

			        return res.send({
			        	msg:'no'
			        });
			    }else{
			    	 return res.send({
			    	 	msg:'yes',
			    	 	val:random
			    	 });
			    }

			    // if you don't want to use this transport object anymore, uncomment following line
			    mail.transport.close(); 
			});
		});


	app.route('/updatePersonInfo')
		.post(function(req,res){

			var body = req.body,arr = {
				key:[],
				value:[]
			};
			
			for( var i in body ){
				arr.key.push( i );
				arr.value.push( body[i] );
			}

			user = req.session.user ;
			delete req.session.user;
			user.nameID[ arr.key[1] ] = arr.value[1];
			req.session.user = user;

			personInfoModel.updatePersonInfoById(arr,function(err,personInfo){
				if( err ){
					return console.log( err );
				}
				res.send();
			});
		});

	//微信登陆
	app.route('/wechat/login')
        .get(function(req,res){

        		var args = URL.parse(req.url,true).query;

                new Promise(function(resolve,reject){

                	client.getAccessToken(args['code'],function(err,result){
                        var accessToken = result.data.access_token;
                        var openid = result.data.openid;
                        resolve(openid);
	                });

                }).then(function(openid){
                        return new Promise(function(resolve,reject){
                        	client.getUser(openid,function(err,result){
	                                var userinfo = result;
	                                resolve(userinfo);
	                        });
                        })
                         
                }).then(function(userinfo){	

			var wxuser = userinfo;
                	adminModel.findIsRegisterByOpenId(wxuser.openid,function(err,users){
				

                		if(err){
                			reject(err);
                		}else{

                			if( users.length ){
                				req.session.user = users[0];
                				res.redirect('/');
                			}else{

                				var personInfo = new personInfoModel({
									name:wxuser.nickname
								});

                				new Promise(function(resolve,reject){

                					personInfo.save(function(err,person){

                						var person = person;
		                                resolve(person);
                					});
                				}).then(function(person){

                					var admin = new adminModel({
                						username:person.name,
                						registerBy:'微信',
                						nameID:person._id,
                						openid:wxuser.openid
                					});

                					admin.save(function(err,admin){

                						if(err){return console.log(err);}
                						adminModel.findPersonByUsername(admin.username,function(err,admin){
                							if(err){return console.log(err);}
                							req.session.user = admin[0];

                							return res.redirect('/');
                						});
                						
                					});
                				});
                				

                			}
                		}

                	});

                	
                });

        });
}