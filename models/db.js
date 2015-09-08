
var mongoose = require('mongoose');
var connectionString = 'localhost/zuzuxia';
var option = {};

function connectDB(){

	option = {
	server:{
		auto_reconnect:true,
		poolSize:10
		}
	};

	mongoose.connect(connectionString,option,function(err,res){

		if(err) {
		    console.log('[mongoose log] Error connecting to: ' + connectionString + '. ' + err);
		  } else {
		    console.log('[mongoose log] Successfully connected to: ' + connectionString);
		  }
	});
	process.on('SIGINT', function() {
		mongoose.connection.close(function () {
		             console.log('Mongoose disconnected through app termination');
		             process.exit(0);   });
	});
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'mongoose connection error:'));
	db.on('open', function callback () {
	    console.log('mongoose open success');
	});
	return db;
}

// connectDB();
module.export = connectDB();