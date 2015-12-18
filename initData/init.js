var db = require('../models/db');
var managerAdmin = require('../models/managerAdmin');
var pageSet = require('../models/pageSet')
var mongoose = require('mongoose');

//生成密码的 md5 值
var crypto=require('crypto');
var md5 = crypto.createHash('md5');



mongoose.connection.on('connected',function(err){

	if( err ){return console.log( err );}

	managerAdmin.fetch(function(err,count){

		if( err ){return console.log(err);}

		if( !count ){
			var managerinit = new managerAdmin({
				username:'zhanheng',
				password:md5.update('zhanheng930519').digest('hex')
			});

			managerinit.save(function(err,d){

				if( err ){return console.log(err);}
				console.log(d);
			});
		}
	});

	pageSet.counts(function(err,count){

		if( err ){return console.log(err);}

		if( !count ){
			var set = new pageSet({
				bannerUrl:['/image/banner/banner-1.jpg','/image/banner/banner-2.jpg','/image/banner/banner-3.jpg','']
			});

			set.save(function(err,d){

				if( err ){return console.log(err);}
				console.log(d);
			});
		}
	});
})