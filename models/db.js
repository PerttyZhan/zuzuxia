
var mongoose =  require('mongoose');
var dbURL = 'mongodb://localhost/zuzuxia';
var dbopt = {
	server:{
		auto_reconnect:true,
		poolSize:10
	},
	user:'zhanheng',
	pass:'123456'
};

mongoose.connect( dbURL,dbopt );

mongoose.connection.on('connected',function(){
	console.log('Mongoose connected to ' + dbURL);
})

mongoose.connection.on('error',function(err){
	console.log('Mongoose connected error ' + err);
})

mongoose.connection.on('disconnected',function(){
	console.log('Mongoose disconnected ');
})

process.on('SIGINT',function(){
	mongoose.connection.close(function(){
		console.log('Mongoose disconnected through app termination');
        process.exit(0); 
	})
})
