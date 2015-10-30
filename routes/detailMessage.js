
/*
	房子的具体信息
*/

var Q = require('q');
var houseMessage = require('../models/houseModel');
var personCollect = require('../models/collectModel');
var houseConfig = require('../models/houseConfig');
var wx = require('./wx');

module.exports = function(app){


	app.route('/pc/detailMessage/:_id')
		.get(function(req,res){
			var user = getUser(req),sign = true,deferred = Q.defer();

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

						return res.render('pc/detailMessage',{ 
							title:'租租侠---大学生租房平台',
							user:user,
							house:arguments[0][0],
							sign:sign,
							webLogin:wx
						});
					});
			}
			else{
				return res.redirect('/');
			}
		});


	app.route('/collectHouse')
		.post(function(req,res){

			var _id = req.body._id,user = getUser(req);

			if( !!user.username ){

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

	app.route('/appointHouse')
		.post(function(req,res){

			var _id = req.body._id,user = getUser(req);
			if( !!user.usrename ){

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

}

function getUser(req,username){

		if( !!req.session.user ){
			return req.session.user;
		}else{
			return {};
		}
	}