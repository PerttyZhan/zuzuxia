var settings = require('../settings');
var db = require('../models/db');

var adminModel = require('../models/admin');
var personInfoModel = require('../models/personInfo');
var personMessage = require('../models/personMessage');
var houseMessage = require('../models/houseModel');
var personAppoint = require('../models/personAppointModel');
var mailSend = require('../models/sendEmail');
var houseconfig = require('../models/houseConfig');
var managerAdmin = require('../models/managerAdmin');
var personCollect = require('../models/collectModel');
var pageSet = require('../models/pageSet');

var Promise = require('promise');
var URL = require('url');
var crypto = require('crypto');
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var images = require('images');
var Q = require('q');
var oAuth = require('wechat-oauth');
var client = new oAuth(settings.wx.app_id,settings.wx.app_secret);

module.exports = function(app){

	app.route('/')
		.get(function(req,res){

			var user = {},deferred = Q.defer(),code,state;
			code = req.body.code || req.params.code || '';
			state = req.body.state || req.params.state || '';


			console.log( code );
			console.log( state );
			if( getUser(req) ){
				user = req.session.user
			}
			var url = client.getAuthorizeURLForWebsite('http://young.so/wechat/login');

			Q.all([
				houseMessage.findHouseByArea('杭州',function(err,house){

					if( err ){
						return console.log( err );
					}	
					deferred.resolve(house);
					return deferred.promise;
				}),
				pageSet.fetch(function(err,sets){

					if( err ){
						return console.log( err );
					}	
					deferred.resolve(sets);
					return deferred.promise;
				})
			]).spread(function(){

				console.log( arguments[0] );

				res.render('index',{ 
					title:'租租侠---大学生租房平台',
					user:user,
					houses:arguments[0],
					sets:arguments[1][0],
					webLogin:url
				});
			});
			
		});
	app.route('/detailMessage/:_id')
		.get(function(req,res){
			var user = getUser(req)?req.session.user:{},sign = true,deferred = Q.defer();
			 var url = client.getAuthorizeURLForWebsite('http://young.so/wechat/login');

			if( req.params._id ){

				Q.all([
					houseMessage.findHouseById(req.params._id,function(err,house){

						if( err ){
							return console.log( err );
						}	
						
						deferred.resolve(house[0]);
						return deferred.promise;
					}),
					personCollect.findIsAlive(user.username,req.params._id ,function(err,count){
			    		
			    		console.log('count = '+count);
						if( count ){
							sign = false;
						}else{
							sign = true;
						}
						deferred.resolve();
						return deferred.promise;
					})
					]).spread(function(){

						return res.render('detailMessage',{ 
							title:'租租侠---大学生租房平台',
							user:user,
							house:arguments[0][0],
							sign:sign,
							webLogin:url
						});
					});
			}
			else{
				return res.redirect('/');
			}
		});
	app.route('/appointHouse')
		.post(function(req,res){

			var _id = req.body._id,user = {};
			if( req.session.user ){

				user = req.session.user;

				var appoint = new personAppoint({
					user:user.username,
					houseID:_id,
					telephone:user.nameID.telephone
				});
				
				appoint.save(function(err,appoint){
					return res.send({err:'',yes:'ok'});
				});
			}else{
				res.send({err:'no login',yes:''}); 
			}
			
		});

	app.route('/collectHouse')
		.post(function(req,res){

			var _id = req.body._id,user = {};

			if( req.session.user ){

				user = req.session.user;
				var collect = new personCollect({
					user:user.username,
					houseID:_id
				});
				

				collect.save(function(err,appoint){
					return res.send({err:'',yes:'ok'});
				});
			}else{
				res.send({err:'no login',yes:''}); 
			}
		});

	app.route('/deleCollectHouse')
		.post(function(req,res){

			var _id = req.body._id;

			if( req.session.user ){

				personCollect.removeCollect(_id,function(err,appoint){

					if( err ){
						return console.log( err );
					}

					return res.send({err:'',yes:'yes'});

				});

			}else{
				return res.send({err:'no login',yes:''}); 
			}
		});


	app.route('/siteapt')
		.post(function(req,res){

			if( req.session.user ){

				user = req.session.user;
				var appoint = new personAppoint({
					user:user.username,
					telephone:user.nameID.telephone,
					area:req.body.site,
					startTime:req.body.starttime,
					endTime:req.body.endtime,
				});
				
				appoint.save(function(err,appoint){

					return res.redirect('/personCenter');

				});
			}else{
				res.send({err:'no login',yes:''}); 
			}

			

		});

	app.route('/uploadbgImg')
		.post(function(req,res){

			var form = new multiparty.Form({uploadDir:'./public/image/personCenter/'});

			form.parse(req,function(err,fields,files){

				if(err){
					console.log( 'parse error'+err );
				}else{
					var inputFile = files.bgimg;
					var upload = inputFile[0].path.substr('public'.length);
					var username = fields.username;

					var url = fields.url;
					uploadPath = inputFile[0].path;

					// dir = 'public/image/personCenter/'+fields._id;
					// var dstPath = dir+'/'+inputFile[0].originalFilename;

					// images(uploadPath)
					//   // .size(387,300)		//宽度为387，高度300
					//   .save(dstPath,{
					//   	quality:50     //图片质量为50
					//   });

					//   fs.unlinkSync(uploadPath);
					adminModel.updateBgImg(username,upload,function(err,admin){

						if(err){
							return console.log(err);
						}

						var user = req.session.user;
						delete req.session.user;
						user.bgimg = upload;
						req.session.user = user;

						res.redirect(url);
					});
				}
			})
		});
	app.route('/personCenter')
		.get(function(req,res){

			var args = URL.parse(req.url,true).query;
			var user = {},deferred = Q.defer(),count =  args['count'] == undefined ? 1 : args['count'];
			if( getUser(req) ){
				user = req.session.user ;

				Q.all([
					personAppoint.findAppointByUsername(user.username,count,function(err,appoint){

						if( err ){
							return console.log( err );
						}	
						
						deferred.resolve(appoint);
						return deferred.promise;
					}),
					adminModel.findPersonByUsername(user.username ,function(err,personInfos){
			    
						personInfo = personInfos[0].nameID;
						deferred.resolve(personInfo);
						return deferred.promise;
					})
					]).spread(function(){

					var appoint = arguments['0'];

					console.log( appoint );
					return res.render('personCenter',{ 
						title:'租租侠---大学生租房平台',
						user:user,
						appoints:appoint.slice( (count - 1)*5,count*5 ),
						count:count,
						all:Math.ceil( appoint.length/5 ) == 0?1:Math.ceil( appoint.length/5 ),
						personinfo:Array.prototype.slice.call(arguments)[1][0].nameID
					});
				});
				
			}else{
				return res.redirect('/');
			}
			
		});
	app.route('/personCenterMe')
		.get(function(req,res){
			var user = {},personInfo = {};

			if( getUser(req) ){

				user = req.session.user ;
				adminModel.findPersonByUsername(user.username ,function(err,personInfos){
			    
					personInfo = personInfos[0].nameID;
					return res.render('personCenter-me',{ 
						title:'租租侠---大学生租房平台',
						user:user,
						personinfo:personInfo
					});
				});
			}
			else{
				res.redirect('/');
			}
		});
	app.route('/personCenterMessage')
		.get(function(req,res){
			var user = {},deferred = Q.defer();;
			if( getUser(req) ){
				user = req.session.user ;

				Q.all([
					personMessage.findMessageByUsername(user.username,function(err,message){

						if(err){
							return console.log(err);
						}

						deferred.resolve(message);
						return deferred.promise;
					}),
					adminModel.findPersonByUsername(user.username ,function(err,personInfos){
			    
						personInfo = personInfos[0].nameID;
						deferred.resolve(personInfo);
						return deferred.promise;
					})
					]).spread(function(){

						return res.render('personCenter-message',{ 
							title:'租租侠---大学生租房平台',
							user:user,
							messages:arguments['0'],
							personinfo:Array.prototype.slice.call(arguments)[1][0].nameID
						});
					});
				

			}
			
		});
	app.route('/reviseMessageStatus')
		.post(function(req,res){

			var _id = req.body._id;

			personMessage.updateIsCheckById(_id,true,function(err,message){

				if( err ){
					return console.log( err );
				}

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
			user.nameID[ arr.key[1] ] = arr.value[1];
			req.session.user = user;

			personInfoModel.updatePersonInfoById(arr,function(err,personInfo){
				if( err ){
					return console.log( err );
				}

				res.send();
			});
		});
	app.route('/personCenterCollect')
		.get(function(req,res){

			var user,deferred = Q.defer();
			if( getUser(req) ){

				user = req.session.user ;

				Q.all([
					personCollect.findCollectByUserName(user.username,function(err,collects){

						if( err ){return console.log(err);}

						deferred.resolve(collects);
						return deferred.promise;
					
					}),
					adminModel.findPersonByUsername(user.username ,function(err,personInfos){
			    
						personInfo = personInfos[0].nameID;
						deferred.resolve(personInfo);
						return deferred.promise;
					})
					]).spread(function(){

						console.log( arguments['0'] );
					return res.render('personCenterCollect',{ 
						title:'租租侠---大学生租房平台',
						user:user,
						collects:arguments['0'],
						personinfo:Array.prototype.slice.call(arguments)[1][0].nameID
					});
				});

			}else{
				return res.redirect('/');
			}
		})

	app.route('/loginAction')
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
	app.route('/loginOut')
		.get(function(req,res){

			delete req.session.user;
			res.send('yes')
		});
	app.route('/sendMessage')
		.post(function(req,res){

			var _src= req.body.src;

			var random = '';

			for( var i=0;i<6;i++){
				random += Math.floor( Math.random()*10 );
			}
			var mail = mailSend(_src,random);

			
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

	app.route('/resetPass')
		.post(function(req,res){
			var username = req.body.username;
			 var pass = req.body.password;

			 console.log( pass );
			 var md5 = crypto.createHash('md5'),
					pass = md5.update( pass ).digest('hex');
			adminModel.valiUsernameAlive(username,function(err,count){

				if(count){

					adminModel.resetPassword(username,pass,function(err,admin){

						if(err){return console.log(err);}

						adminModel.findPersonByUsername(username,function(err,user){

							delete req.session.user;
							console.log( user[0] );
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
	app.route('/register')
		.post(function(req,res){

			var params = req.body || req.params,
				deferred,
				user = {
					username:params.username,
					password:params.password,
					registerBy:params.registerBy,
					registerS:params.username
				},personInfo,md5;

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
					registerS:user.registerS,
					nameID:data._id
				});

				admin.save(function(err,admin){

					if(err){
						return conole.error( err );
					}
					delete req.session.user;

					admin.nameID = data;

					req.session.user = admin;

					console.log( admin );
					return res.send({
						msg:'yes',
						val:''
					});
				});
			});


		});

	//后台 -- 公寓详情
	app.route('/admin')
		.get(function(req,res){

			var err = '';
			
			if( getManagerUser(req) ){
				return res.redirect('/house');
			}
			if( req.session.err != '' ){
				err = req.session.err;
				delete req.session.err;
			}
			
			return res.render('admin-login',{
					title:'租租侠后台登录',
					err:err
				});
			
		});	
	app.route('/house/:_id')
		.get(function(req,res){

			if( !getManagerUser(req) ){
				return res.redirect('/admin');
			}

			var _id = req.params._id;
			houseMessage.findHouseById(_id,function(err,house){

					if( err ){
						return console.log( err );
					}

					if( !house.length ){
						return res.redirect('/admin');
					}
					var _house = house[0];

					return res.render('houseUpdate',{ 
						title:'租租侠---公寓详情--下沙高教房',
						house:_house
					});
				});
		});
	app.route('/updateMessage')
		.post(function(req,res){

			var _id = req.body._id;
			var key = req.body.key;
			var val = req.body.val;
			var config_id = req.body.config_id;

			if( key != 'internet' && key != 'furniture' && key != 'electri' && key != 'other' ){
				houseMessage.updateById(_id,key,val,function(err,info){

					if( err ){
						 console.log(err);
						 return res.send({msg:'err',val:''});
					}

					return res.send({msg:'yes',val:''});
				});
			}else{

				houseconfig.updateById(config_id,key,val,function(err,config){

					if( err ){
						console.log( err );
						return res.send({
						msg:'error',
						val:'no'
					});
					} 


					return res.send({
						msg:'res',
						val:'yes'
					});
				});
			}
		});		

	//后台 -- 预约管理
	app.route('/aptManager')
		.get(function(req,res){

			var args = URL.parse(req.url,true).query,
				count =  args['count'] == undefined ? 1 : args['count'];

			personAppoint.findAll(function(err,apponits){

				if( err ){return console.log(err)}

				return res.render('aptManager',{
					title:'后台登录--预约管理',
					appoints:apponits.slice( (count - 1)*20,count*20 ),
					count:count,
					all:Math.ceil( apponits.length/20 )
				})
			});

			
		});

	//后台--上传图片
	app.route('/uploadImage')
		.post(function(req,res){

			var form = new multiparty.Form({uploadDir:'./public/image/'});

			form.parse(req,function(err,fields,files){
				if( err ){
					console.log( 'parse error'+err );
				}else{

					var inputFile = files.imgUrl;
					var uploadPath,dstPath,dir,val,name,temp;

					dir = 'public/image/'+fields._id;

					fs.mkdir( dir,function(){
						uploadPath = inputFile[0].path;
						dstPath = dir+'/'+inputFile[0].originalFilename;

						if( fields.changeType == 'scollUrl' ){
							name = 'scollUrl';

						images(uploadPath)
						  .size(1900,700)		//宽度为552
						  .save(dstPath,{
						  	quality:50     //图片质量为50
						  });

						}else{
							name = 'coverUrl';
						images(uploadPath)
						  .size(456,341)		//宽度为552
						  .save(dstPath,{
						  	quality:50     //图片质量为50
						  });
						}
						
						for( var i=0;i<fields[name].length;i++ ){
							temp = fields[name];
							if( temp[i] == '1'){
								temp[i] = '/image/'+fields._id+'/'+inputFile[0].originalFilename;
								break;
							}
						}
						val = fields[name].toString();
						houseMessage.updateById(fields._id,name,val,function(err,info){

							if( err ){
								 console.log(err);
							}
						});
					} );
					console.log('更新目录已创建成功\n');
					res.end('');
						// res.redirect('/house/'+fields._id);
				}
			});

			
		});
	app.route('/createHouse')
		.get(function(req,res){

			var config = new houseconfig({});
			

			config.save(function(err,config){

				if(err){ return console.log( err );}
				var house = new houseMessage({
					houseconfig:config._id
				});
				house.save(function(err,house){

					if( err ){return console.log(err)}

					// res.render('createHouse',{
					// 	title:'租租侠---后台--新建公寓',
					// 	house:house,
					// 	config:config
					// });

					res.redirect('/house/'+house._id);
				});
			})
		});
	app.route('/changeStatus')
		.post(function(req,res){
			var _id = req.body._id;
			var val = req.body.val;

			houseMessage.updateStatusById(_id,val,function(err,house){

				if(err){
					 console.log(err);
					return res.send('no');
				}


				return res.send('yes');
			});

		});
	app.route('/UsernameIsOnly')
		.post(function(req,res){

			var username = req.body.username;

			managerAdmin.isOnlyByUsername(username,function(err,count){

				if( !count ){
					return res.send('no');
				}else{
					return res.send('yes');
				}

			});
		})
	app.route('/loginManager')
		.post(function(req,res){

			var username = req.body.username || 'no';
			var password = req.body.password || 'no';

			var md5 = crypto.createHash('md5');
			password = md5.update( password ).digest('hex');

			managerAdmin.regPassAndUsername(username,password,function(err,count){

				if( err ){
					return console.log(err);
				}

				if( count ){
					
					req.session.managerUser = {username:username,password:password};

					return res.redirect('/house');
				}else{

					req.session.err = '密码不对';

					return res.redirect('/admin');
				}
			});

		});
	app.route('/house')
		.get(function(req,res){

			if( !getManagerUser(req) ){

				return res.redirect('/admin');

			}
			houseMessage.fetch(function(err,houses){
				if( err ){
					return console.log( err );
				}
				return res.render('house',{ 
					title:'租租侠---公寓详情',
					houses:houses
				});
			});
		});

	//后台轮播图设置
	app.route('/setBanner')
		.get(function(req,res){

			if( !getManagerUser(req) ){

				return res.redirect('/admin');

			}

			pageSet.fetch(function(err,sets){
				if( err ){
					return console.log( err );
				}

				return res.render('setBanner',{ 
					title:'租租侠---轮播图',
					sets:sets[0]
				});
			});
		});

	app.route('/updatePageSet')
		.post(function(req,res){

			var _id = req.body._id,
				 key = req.body.key,
				 val = req.body.val,
				 arr = [],vals = val.split(',');

			for( var i = 0;i<vals.length;i++){
				arr.push(vals[i]);
			}

			pageSet.updateById(_id,key,arr,function(err,set){

				if(err){
					return console.log( err );
				}
				return console.log( set );
			});

		});

	app.route('/updateBanner')
		.post(function(req,res){

			var form = new multiparty.Form({uploadDir:'./public/image/banner/'}),
				inputFile,changeType,val,_id;
			
			form.parse(req,function(err,fields,files){

				inputFile = files.bannerUrl;
				val = fields.bannerUrl;
				_id = fields._id;
				changeType = fields.changeType,despath = '/image/banner/' + inputFile[0].originalFilename;

				val.forEach(function(el,index,arr){

					if( el == 'undefined' ){

						arr[index] = despath;
					}
				});

				images(inputFile[0].path)
				  .size(1900,700)		//宽度为1900
				  .save('public/'+despath,{
				  	quality:50     //图片质量为50
				  });

				  fs.unlinkSync(inputFile[0].path);
				 pageSet.updateById( _id,changeType,val,function(err,set){

				 	if( err ){
				 		return console.log( err );
				 	}

				 	return console.log( set );
				 } );

				 res.end('');
			})
		});

	app.route('/quitManager')
		.get(function(req,res){

			delete req.session.managerUser;
			
			res.redirect('/admin');

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
                				req.session.user = user[0];
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
                						registerS:person.name,
                						nameID:person._id
                					});

                					admin.save(function(err,admin){

                						if(err){return console.log(err);}

                						req.session.user = admin;

                						return res.redirect('/');
                					});
                				});
                				

                			}
                		}

                	});

                	
                });

        });

	app.route('/wxlogin')
	    .get(function(req,res){
			res.render('wxlogin');
		});
	app.use(function (req, res) {
		res.render("404",{
			title:'Not Found'
		});
	});


}

function getUser(req,username){

	if( !!req.session.user ){
		return true;
	}else{
		return false;
	}
}

function getManagerUser(req){
	if( !!req.session.managerUser ){
		return true;
	}else{
		return false;
	}
}
