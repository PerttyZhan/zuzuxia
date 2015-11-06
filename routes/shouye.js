
var houseMessage = require('../models/houseModel');
var pageSet = require('../models/pageSet');
var wx = require('./wx');

var Q = require('q');


module.exports = function(app){

	app.route('/pc')
		.get(function(req,res){

			var user = getUser(req),
				deferred = Q.defer();
			console.log(user);
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

				res.render('pc/index',{ 
					title:'青年颂---大学生租房平台',
					user:user,
					houses:arguments[0],
					sets:arguments[1][0],
					webLogin:wx
				});
			});
		});

	app.route('/h5')
		.get(function(req,res){

			var user = getUser(req),
				deferred = Q.defer();
			console.log(user);
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

				res.render('h5/index',{ 
					title:'null',
					user:user,
					houses:arguments[0],
					sets:arguments[1][0],
				});
			});
			

		});
};

function getUser(req,username){

	if( !!req.session.user ){
		return req.session.user;
	}else{
		return {};
	}
}
