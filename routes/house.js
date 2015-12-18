/*
	房子的预约，收藏,查看
*/
var houseMessage = require('../models/houseModel');
var personCollect = require('../models/collectModel');
var houseConfig = require('../models/houseConfig');
var personAppoint = require('../models/personAppointModel');

var Q = require('q');
var wx = require('./wx');

var house = {
	indexApt:function(req,res){
		var user = getUser(req);
		var data = JSON.parse(req.body.data);

		if( !!user.username ){
			
			var appoint = new personAppoint({
				userID:user.nameID._id,
				telephone:data['aptConcat'],
				area:data['site']
			});

		}else{
			var appoint = new personAppoint({
				name:data['aptName'],
				telephone:data['aptConcat'],
				area:data['site']
			});
		}

		appoint.save(function(err,appoint){
			return res.send('ok');
		});
	},
	detailApt:function(req,res){

		var _id = req.body._id,
			user = req.session.user;

		if( !!user.username ){
			var appoint = new personAppoint({
				userID:user.nameID._id,
				houseID:_id,
				telephone:user.nameID.telephone
			});
			
			appoint.save(function(err,appoint){
				return res.send({err:'',yes:'ok'});
			});
		}else{
			res.send({err:'no login',yes:''}); 
		}
	},
	phoneApt:function(req,res){

		var appoint = new personAppoint({}),
			datas = JSON.parse(req.body.data);

		for( var key in  datas){
			appoint[key] = datas[key];
		}
		appoint.save(function(err,appoint){

			return res.send('ok')
		});

	},
	clthouse:function(req,res){
		var _id = req.body._id,
			user = req.session.user;

		var collect = new personCollect({
			user:user.username,
			houseID:_id
		});
		

		collect.save(function(err,appoint){
			return res.send({err:'',yes:'ok'});
		});
	},
	deleCltHouse:function(req,res){
		var _id = req.body._id;
		personCollect.removeCollect(_id,function(err,appoint){
			if( err ){
				return console.log( err );
			}
			return res.send({err:'',yes:'yes'});

		});
	},
	detailHouse:function(req,res){
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
		    		
					if( count ){
						sign = false;
					}else{
						sign = true;
					}
					deferred.resolve();
					return deferred.promise;
				})
				]).spread(function(){

					console.log( arguments[0][0] );
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
	}
};

function getUser(req,username){

	if( !!req.session.user ){
		return req.session.user;
	}else{
		return {};
	}
}

module.exports = house;