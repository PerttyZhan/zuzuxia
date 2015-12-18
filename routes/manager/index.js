
/*
	管理后台的基础路由
*/
var managerAdmin = require('../../models/managerAdmin');
var houseMessage = require('../../models/houseModel');
var pageSet = require('../../models/pageSet');
var personAppoint = require('../../models/personAppointModel');

var crypto = require('crypto');
var URL = require('url');

module.exports = function(app){

	app.route('/pc/admin')
		.get(function(req,res){

			var err = '';
			
			if( req.session.managerUser ){
				return res.redirect('/pc/house');
			}
			if( !!req.session.err ){
				console.log( req.session.err );
				err = req.session.err;
				delete req.session.err;
			}
			return res.render('pc/admin-login',{
					title:'租租侠后台登录',
					err:err
				});
			
		});
	app.route('/pc/loginManager')
		.post(function(req,res){

			var username = req.body.username || 'no';
			var password = req.body.password || 'no';

			var md5 = crypto.createHash('md5');
			password = md5.update( password ).digest('hex');

			managerAdmin.regPassAndUsername(username,password,function(err,count){

				if( err ){
					return console.log(err);
				}

				if( count ){
					
					req.session.managerUser = {username:username,password:password};

					return res.redirect('/pc/house');
				}else{

					req.session.err = '密码不对';

					return res.redirect('/pc/admin');
				}
			});

		});	
	app.route('/UsernameIsOnly')
		.post(function(req,res){

			var user = JSON.parse( decodeURIComponent(req.body.data) );

			managerAdmin.isOnlyByUsername(user.username,function(err,count){

				if( !count ){
					return res.send('no');
				}else{
					return res.send('yes');
				}

			});
		})
	app.route('/pc/house')
		.get(function(req,res){

			if( !req.session.managerUser ){

				return res.redirect('/admin');

			}
			houseMessage.fetch(function(err,houses){
				if( err ){
					return console.log( err );
				}
				return res.render('pc/house',{ 
					title:'租租侠---公寓详情',
					houses:houses
				});
			});
		});

	app.route('/pc/house/:_id')
		.get(function(req,res){

			if( !getManagerUser(req) ){
				return res.redirect('/pc/admin');
			}

			var _id = req.params._id;
			houseMessage.findHouseById(_id,function(err,house){

					if( err ){
						return console.log( err );
					}

					if( !house.length ){
						return res.redirect('/pc/admin');
					}
					var _house = house[0];

					return res.render('pc/houseUpdate',{ 
						title:'租租侠---公寓详情--下沙高教房',
						house:_house
					});
				});
		});
	app.route('/pc/setBanner')
		.get(function(req,res){

			if( !req.session.managerUser ){

				return res.redirect('/pc/admin');

			}

			console.log( 'setBanner' );
			pageSet.fetch(function(err,sets){
				if( err ){
					return console.log( err );
				}

				return res.render('pc/setBanner',{ 
					title:'租租侠---轮播图',
					sets:sets[0]
				});
			});
		});
	app.route('/pc/aptManager')
		.get(function(req,res){

			var args = URL.parse(req.url,true).query,
				count =  args['count'] == undefined ? 1 : args['count'];

			personAppoint.findAll(function(err,apponits){

				if( err ){return console.log(err)}

				return res.render('pc/aptManager',{
					title:'后台登录--预约管理',
					appoints:apponits.slice( (count - 1)*20,count*20 ),
					count:count,
					all:Math.ceil( apponits.length/20 )
				})
			});

			
		});

	app.route('/quitManager')
		.get(function(req,res){

			delete req.session.managerUser;
			
			res.redirect('/pc/admin');

		});
}

function getManagerUser(req,username){

	if( !!req.session.managerUser ){
		return true;
	}else{
		return false;
	}
}