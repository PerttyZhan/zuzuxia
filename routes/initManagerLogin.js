
// var managerAdmin = require('../models/managerAdmin');
// var crypto = require('crypto');
// var md5 = crypto.createHash('md5');

// var password = md5.update( '88208777' ).digest('hex');

// var manager = new managerAdmin({
// 	username:'hcadmin',
// 	password:password
// });

// console.log( manager );

// manager.save(function(err,admin){

// 	if( err ){
// 		console.log( err );
// 	}

// 	console.log(admin);
// });
var db = require('../models/db');
var pageSet = require('../models/pageSet');
var p = new pageSet({
	bannerUrl:['/image/banner/banner-1.jpg','/image/banner/banner-2.jpg','/image/banner/banner-3.jpg','']
});

p.save(function(err,p){

	if( err ){
		console.log( err );
	}

	console.log( p );
});