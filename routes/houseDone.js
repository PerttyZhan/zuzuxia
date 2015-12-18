/*
	房子的预约，收藏
*/

var Q = require('q');
var houseMessage = require('../models/houseModel');
var personCollect = require('../models/collectModel');
var houseConfig = require('../models/houseConfig');
var personAppoint = require('../models/personAppointModel');

module.exports = function(app){

	app.route('/siteapt')
		.post(function(req,res){

			var user = getUser(req);
			var data = JSON.parse(req.body.data);

			if( !!user.username ){
				
				var appoint = new personAppoint({
					user:user.username,
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

		});
	app.route('/phoneApt')
		.post(function(req,res){

				var appoint = new personAppoint({})
					datas = JSON.parse(req.body.data);

				for( var key in  datas){
					console.log( key );
					appoint[key] = datas[key];
				}
				appoint.save(function(err,appoint){

					return res.send('ok')
				});
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

			if( !!user.username ){

				console.log( user );
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
}

function getUser(req,username){

	if( !!req.session.user ){
		return req.session.user;
	}else{
		return {};
	}
}