
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
					title:'租租侠---大学生租房平台',
					user:user,
					houses:arguments[0],
					sets:arguments[1][0],
					webLogin:wx
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
