/*
图片处理部分
*/

var adminModel = require('../models/admin');
var houseMessage = require('../models/houseModel');
var pageSet = require('../models/pageSet');

var multiparty = require('multiparty');
var fs = require('fs');
var images = require('images');

module.exports = function(app){

	app.route('/pc/uploadbgImg')
		.post(function(req,res){

			var form = new multiparty.Form({uploadDir:'./public/image/personCenter/'}),
				user = getUser(req),inputFile,upload,url,uploadPath;

			if( !!user.username ){

				form.parse(req,function(err,fields,files){

					if(err){
						console.log( 'parse error'+err );
					}else{
						 inputFile = files.bgimg;
						 upload = inputFile[0].path.substr('public'.length);

						 url = fields.url;
						uploadPath = inputFile[0].path;
						adminModel.updateBgImg(user.username,upload,function(err,admin){

							if(err){
								return console.log(err);
							}
							delete req.session.user;
							user.bgimg = upload;
							req.session.user = user;
							res.redirect(url);
						});
					}
				})
			}
			
		});

	app.route('/mg/uploadImage')
		.post(function(req,res){

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

			
		});
	
	app.route('/mg/updateBanner')
		.post(function(req,res){

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
		});
}

function getUser(req,username){

	if( !!req.session.user ){
		return req.session.user;
	}else{
		return {};
	}
}