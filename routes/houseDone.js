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
			if( !!user.username ){

				var appoint = new personAppoint({
					user:user.username,
					telephone:user.nameID.telephone,
					area:req.body.site,
					startTime:req.body.starttime,
					endTime:req.body.endtime,
				});
				
				appoint.save(function(err,appoint){

					return res.redirect('/pc/personCenter');
				});
			}else{
				res.send({err:'no login',yes:''}); 
			}

		});
	app.route('/phoneApt')
		.post(function(req,res){

				var appoint = new personAppoint({})
					datas = JSON.parse(req.body.data);

				console.log( datas );

				for( var key in  datas){
					console.log( key );
					appoint[key] = datas[key];
				}
				console.log( appoint );
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