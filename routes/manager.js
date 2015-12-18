
var houseMessage = require('../models/houseModel');
var houseconfig = require('../models/houseConfig');
var pageSet = require('../models/pageSet');
var personAppoint = require('../models/personAppointModel');

var crypto = require('crypto');
var URL = require('url');
var multiparty = require('multiparty');
var fs = require('fs');
var images = require('images');


var manager = {
	menuHouse:function(req,res){
		res.redirect(req.url+'/show');
	},
	house:function(req,res){
		houseMessage.fetch(function(err,houses){
			if( err ){
				return console.log( err );
			}
			return res.render('pc/house',{ 
				title:'租租侠---公寓详情',
				houses:houses
			});
		});
	},
	showHouse:function(req,res){
		var _id = req.params._id;
		houseMessage.findHouseById(_id,function(err,house){

			if( err ){
				return console.log( err );
			}
			if( !house.length ){
				return res.redirect('/pc/manager/login/house');
			}
			var _house = house[0];

			return res.render('pc/houseUpdate',{ 
				title:'租租侠---公寓详情--下沙高教房',
				house:_house
			});
		});
	},
	setBanner:function(req,res){

		pageSet.fetch(function(err,sets){
			if( err ){
				return console.log( err );
			}

			return res.render('pc/setBanner',{ 
				title:'租租侠---轮播图',
				sets:sets[0]
			});
		});
	},
	aptManager:function(req,res){
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
	},
	newHouse:function(req,res){
		var config = new houseconfig({});
		config.save(function(err,config){
			if(err){ return console.log( err );}
			var house = new houseMessage({
				houseconfig:config._id
			});
			house.save(function(err,house){

				if( err ){return console.log(err)}
				res.redirect('/pc/manager/login/house/'+house._id);
			});
		})
	},
	updateHouse:function(req,res){
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
	},
	updateImg:function(req,res){
		var form = new multiparty.Form({uploadDir:'./public/image/'});

		form.parse(req,function(err,fields,files){
			if( err ){
				console.log( 'parse error'+err );
			}else{

				var inputFile = files.imgUrl;
				var uploadPath,dstPath,dir,val,name,temp;

				dir = 'public/image/'+fields._id;

				fs.mkdir( dir,function(){
					uploadPath = inputFile[0].path;
					dstPath = dir+'/'+inputFile[0].originalFilename;

					if( fields.changeType == 'scollUrl' ){
						name = 'scollUrl';

					images(uploadPath)
					  .size(1900,700)		//宽度为552
					  .save(dstPath,{
					  	quality:50     //图片质量为50
					  });

					}else{
						name = 'coverUrl';
					images(uploadPath)
					  .size(456,341)		//宽度为552
					  .save(dstPath,{
					  	quality:50     //图片质量为50
					  });
					}
					
					for( var i=0;i<fields[name].length;i++ ){
						temp = fields[name];
						if( temp[i] == '1'){
							temp[i] = '/image/'+fields._id+'/'+inputFile[0].originalFilename;
							break;
						}
					}
					val = fields[name].toString();
					houseMessage.updateById(fields._id,name,val,function(err,info){

						if( err ){
							 console.log(err);
						}
					});
				} );
				console.log('更新目录已创建成功\n');
				res.end('');
					// res.redirect('/house/'+fields._id);
			}
		});
	},
	changeStatus:function(req,res){
		var _id = req.body._id;
		var val = req.body.val;

		houseMessage.updateStatusById(_id,val,function(err,house){

			if(err){
				 console.log(err);
				return res.send('no');
			}
			return res.send('yes');
		});
	},
	bannerUpdate:function(req,res){
		var form = new multiparty.Form({uploadDir:'./public/image/banner/'}),
			inputFile,changeType,val,_id;
		
		form.parse(req,function(err,fields,files){

			inputFile = files.bannerUrl;
			val = fields.bannerUrl;
			_id = fields._id;
			changeType = fields.changeType,despath = '/image/banner/' + inputFile[0].originalFilename;

			val.forEach(function(el,index,arr){

				if( el == 'undefined' ){

					arr[index] = despath;
				}
			});

			images(inputFile[0].path)
			  .size(1900,700)		//宽度为1900
			  .save('public/'+despath,{
			  	quality:50     //图片质量为50
			  });

			  fs.unlinkSync(inputFile[0].path);
			 pageSet.updateById( _id,changeType,val,function(err,set){
			 	if( err ){
			 		return console.log( err );
			 	}
			 	return console.log( set );
			 } );

			 res.end('');
		})
	}
};

module.exports = manager;