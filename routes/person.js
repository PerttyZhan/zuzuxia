/*
	用户登录，注册，忘记密码,修改信息
*/

// model
var adminModel = require('../models/admin');
var personInfoModel = require('../models/personInfo');
var personMessage = require('../models/personMessage');
var personCollect = require('../models/collectModel');
var personAppoint = require('../models/personAppointModel');
//工具
var crypto = require('crypto');
var Promise = require('promise');
var Q = require('q');
var URL = require('url');
var multiparty = require('multiparty');
var fs = require('fs');
var images = require('images');

var person = {
	loginin:function(req,res){

		var user = JSON.parse( decodeURIComponent(req.body.data) );
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
	},
	register:function(req,res){
		var deferred,
			user = JSON.parse( decodeURIComponent(req.body.data) ),
			md5 = crypto.createHash('md5'),
			personInfo;

			console.log( user );
			if( user.registerBy == '邮箱' ){
				user.email = user.username;
			}else{
				user.phone = user.username;
			}

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

	},
	loginout:function(req,res){
		delete req.session.user;
		res.send('yes')
	},
	resetPwd:function(req,res){
		var user = JSON.parse( decodeURIComponent(req.body.data) );
		var md5 = crypto.createHash('md5');
		var pass = md5.update( user.agapass ).digest('hex');

		adminModel.valiUsernameAlive(user.username,function(err,count){

			if(count){
				adminModel.resetPassword(user.username,pass,function(err,admin){
					if(err){return console.log(err);}
					adminModel.findPersonByUsername(user.username,function(err,user){
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
	},
	showInfo:function(req,res){
		var user = req.session.user;

		return res.render('pc/personCenter-me',{ 
					title:'青年颂---大学生租房平台',
					user:user,
					personinfo:user.nameID
				});
	},
	showMessage:function(req,res){
		var user = req.session.user,deferred = Q.defer();
		Q.all([
			personMessage.findMessageByUsername(user.username,function(err,message){

				if(err){
					return console.log(err);
				}

				deferred.resolve(message);
				return deferred.promise;
			})
			]).spread(function(){

				return res.render('pc/personCenter-message',{ 
					title:'租租侠---大学生租房平台',
					user:user,
					messages:arguments['0'],
					personinfo:user.nameID
				});
			});
	},
	showColls:function(req,res){
		var user = req.session.user,deferred = Q.defer();

		Q.all([
			personCollect.findCollectByUserName(user.username,function(err,collects){

				if( err ){return console.log(err);}

				deferred.resolve(collects);
				return deferred.promise;
			
			})
			]).spread(function(){

			return res.render('pc/personCenterCollect',{ 
				title:'租租侠---大学生租房平台',
				user:user,
				collects:arguments['0'],
				personinfo:user.nameID
			});
		});
	},
	showApt:function(req,res){
		var args = URL.parse(req.url,true).query;
		var user = req.session.user,
			deferred = Q.defer(),
			count =  args['count'] == undefined ? 1 : args['count'];

		Q.all([
			personAppoint.findAppointByUsername(user.nameID._id,count,function(err,appoint){

				if( err ){
					return console.log( err );
				}	
				deferred.resolve(appoint);
				return deferred.promise;
			})
			]).spread(function(){

			var appoint = arguments['0'];
			console.log( appoint );
			return res.render('pc/personCenter',{ 
				title:'租租侠---大学生租房平台',
				user:user,
				appoints:appoint.slice( (count - 1)*5,count*5 ),
				count:count,
				all:Math.ceil( appoint.length/5 ) == 0?1:Math.ceil( appoint.length/5 ),
				personinfo:user.nameID
			});
		});
	},
	updateInfo:function(req,res){
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
			res.send('ok');
		});
	},
	changeBg:function(req,res){

		var form = new multiparty.Form({uploadDir:'./public/image/personCenter/'}),
			user = req.session.user,inputFile,upload,url,uploadPath;

		form.parse(req,function(err,fields,files){

			if(err){
				console.log( 'parse error'+err );
			}else{
				 inputFile = files.bgimg;
				 upload = inputFile[0].path.substr('public'.length);

				 url = fields.url;
				uploadPath = inputFile[0].path;
				adminModel.updateBgImg(user.username,upload,function(err,admin){

					if(err){
						return console.log(err);
					}
					delete req.session.user;
					user.bgimg = upload;
					req.session.user = user;
					res.redirect(url);
				});
			}
		})

	}
};


module.exports = person;