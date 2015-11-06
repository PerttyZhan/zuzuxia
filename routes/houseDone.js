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

			var user = getUser(req),
				agent = req.headers['user-agent'],
				system ={  
					win : false,  
					mac : false,  
					xll : false  
				};
				system.win = agent.indexOf("Win") == 0;  
				system.mac = agent.indexOf("Mac") == 0;  
				system.x11 = (agent == "X11") || (agent.indexOf("Linux") == 0);  
			if( !!user.username ){

				var appoint = new personAppoint({
					user:user.username,
					telephone:user.nameID.telephone,
					area:req.body.site,
					startTime:req.body.starttime,
					endTime:req.body.endtime,
				});
				
				appoint.save(function(err,appoint){

					if(system.win||system.mac||system.xll){ //转向电脑端
						return res.redirect('/pc/personCenter');
					}else{  
						return res.redirect('/h5/centerApt');//转向手机端  
					}
				});
			}else{
				res.send({err:'no login',yes:''}); 
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