
var houseMessage = require('../../models/houseModel');
var pageSet = require('../../models/pageSet');

var Q = require('q');

module.exports = function(app){

	app.route('/h5/login')
		.get(function(req,res){
			var user = getUser(req);

			res.render('h5/login',{ 
					title:'登录',
					user:user
				});
		});
	app.route('/h5/reg')
		.get(function(req,res){
			var user = getUser(req);

			res.render('h5/reg',{ 
					title:'注册',
					user:user
				});
		});
	app.route('/h5/aptHouse')
		.get(function(req,res){
			var user = getUser(req);
			res.render('h5/apt-house',{ 
					title:'预约',
					user:user
				});
		});
}

function getUser(req,username){

	if( !!req.session.user ){
		return req.session.user;
	}else{
		return {};
	}
}