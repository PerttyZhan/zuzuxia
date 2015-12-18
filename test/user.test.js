
var db = require('../models/db');
var http = require('http');
var assert = require("assert");
var querystring = require('querystring');

describe('test user ',function(){


	console.log( db );
	before(function(done){

		db.on('open',done);
	});

	after(function(done){
		db.close(done);
	})

	it( 'should return true when username in database',function(done){

		var postData = {
			username:'dsadsa@qq.com'
		};
		var content = querystring.stringify(postData);

		var option = {
			hostname:'localhost',
			port:3000,
			method:'POST',
			path:'/admin/valiUsername',
			header:{
				'Content-Type':'application/x-www-form-urlencoded',
				'Content-Length':postData.username.length
			}
		};

		var req = http.request(option,function(res){

			assert.equal(res.statusCode,200);
			console.log( JSON.stringify(res.headers) );
			res.setEncoding('utf8');
			res.on('data',function(chunk){
		      	console.log( chunk );
		       done();
		    });
		});

		req.write(postData.username);
		req.end();
	} )
});