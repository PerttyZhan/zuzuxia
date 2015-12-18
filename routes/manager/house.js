/*
	关于房子的操作
*/
var houseMessage = require('../../models/houseModel');
var houseconfig = require('../../models/houseConfig');

module.exports = function(app){

	app.route('/updateMessage')
		.post(function(req,res){

			var _id = req.body._id,
				 key = req.body.key,
				 val = req.body.val,
			 	config_id = req.body.config_id;

			if( key != 'internet' && key != 'furniture' && key != 'electri' && key != 'other' ){
				houseMessage.updateById(_id,key,val,function(err,info){

					if( err ){
						 console.log(err);
						 return res.send({msg:'err',val:''});
					}

					return res.send({msg:'yes',val:''});
				});
			}else{

				houseconfig.updateById(config_id,key,val,function(err,config){

					if( err ){
						console.log( err );
						return res.send({
						msg:'error',
						val:'no'
					});
					} 


					return res.send({
						msg:'res',
						val:'yes'
					});
				});
			}
		});		

	app.route('/changeStatus')
		.post(function(req,res){

			var _id = req.body._id;
			var val = req.body.val;

			console.log( _id );
			console.log( val );
			houseMessage.updateStatusById(_id,val,function(err,house){

				if(err){
					 console.log(err);
					return res.send('no');
				}
				return res.send('yes');
			});

		});

	app.route('/pc/createHouse')
		.get(function(req,res){

			var config = new houseconfig({});
			

			config.save(function(err,config){

				if(err){ return console.log( err );}
				var house = new houseMessage({
					houseconfig:config._id
				});
				house.save(function(err,house){

					if( err ){return console.log(err)}

					// res.render('createHouse',{
					// 	title:'租租侠---后台--新建公寓',
					// 	house:house,
					// 	config:config
					// });

					res.redirect('/pc/house/'+house._id);
				});
			})
		});
}