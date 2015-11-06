

/*
	个人中心部分  我
*/

var adminModel = require('../../models/admin');
var personInfoModel = require('../../models/personInfo');
var personMessage = require('../../models/personMessage');
var personCollect = require('../../models/collectModel');
var personAppoint = require('../../models/personAppointModel');
var Q = require('q');
var URL = require('url');

module.exports = function(app){

	app.route('/pc/personCenterMe')
		.get(function(req,res){
			var user = getUser(req),personInfo = {};

			if( !!user.username ){

					return res.render('pc/personCenter-me',{ 
						title:'青年颂---大学生租房平台',
						user:user,
						personinfo:user.nameID
					});

			}
			else{
				res.redirect('/');
			}
		});

	app.route('/pc/personCenterMessage')
		.get(function(req,res){

			var user = getUser(req),deferred = Q.defer();

			if( !!user.username ){

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

						return res.render('pc/personCenter-message',{ 
							title:'租租侠---大学生租房平台',
							user:user,
							messages:arguments['0'],
							personinfo:Array.prototype.slice.call(arguments)[1][0].nameID
						});
					});
			}
			
		});

	app.route('/pc/personCenter')
		.get(function(req,res){

			var args = URL.parse(req.url,true).query;
			var user = getUser(req),deferred = Q.defer(),count =  args['count'] == undefined ? 1 : args['count'];
			if( !!user.username ){
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

					return res.render('pc/personCenter',{ 
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
	
	app.route('/pc/personCenterCollect')
		.get(function(req,res){

			var user = getUser(req),deferred = Q.defer();
			if( !!user.username ){

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

					return res.render('pc/personCenterCollect',{ 
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

	app.route('/h5/centerMe')
		.get(function(req,res){

			var user = getUser(req),personInfo = {};

			if( !!user.username ){

					return res.render('h5/center-me',{ 
						title:'我',
						user:user,
						personinfo:user.nameID
					});

			}
			else{
				return res.redirect('/');
			}

			
		});

	app.route('/h5/centerApt')
		.get(function(req,res){

			var args = URL.parse(req.url,true).query;
			var user = getUser(req),deferred = Q.defer(),count =  args['count'] == undefined ? 1 : args['count'];
			if( !!user.username ){
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

					return res.render('h5/center-apt',{ 
							title:'预约',
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

	
	app.route('/h5/centerClt')
		.get(function(req,res){

			var user = getUser(req),deferred = Q.defer();
			if( !!user.username ){

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

					return res.render('h5/center-Col',{ 
							title:'收藏',
							user:user,
							collects:arguments['0'],
							personinfo:Array.prototype.slice.call(arguments)[1][0].nameID
						});
				});

			}else{
				return res.redirect('/');
			}

		});


	app.route('/h5/centerMeg')
		.get(function(req,res){

			var user = getUser(req),deferred = Q.defer();

			if( !!user.username ){

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

						return res.render('h5/center-me',{ 
								title:'信息',
								user:user,
								messages:arguments['0'],
								personinfo:Array.prototype.slice.call(arguments)[1][0].nameID
							});
					});
			}
			
		});
}

function getUser(req,username){

	if( !!req.session.user ){
		return req.session.user;
	}else{
		return {};
	}
}