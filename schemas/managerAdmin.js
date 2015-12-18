

var mongoose = require('mongoose');

var managerAdmin = new mongoose.Schema({
	username:{
		type:String,
		default:''
	},
	password:{
		type:String,
		default:''
	},
	createTime:{
		type:String,
		default:''
	}
});

module.exports = managerAdmin;

managerAdmin.pre('save',function(next){

	var year = new Date().getUTCFullYear();
	var month = new Date().getUTCMonth();
	month = month +1;
	var day = new Date().getUTCDate();
	this.createTime = year + '-' + month + '-' + day;
	console.log('save');
	next();
});


managerAdmin.statics = {

	isOnlyByUsername:function(username,cb){
		return this
				.find({username:username})
				.count()
				.exec(cb);
	},
	regPassAndUsername:function(username,password,cb){

		return this
				.find({username:username,password:password})
				.count()
				.exec(cb);
	},
	fetch:function(cb){
		return this
				.count()
				.exec(cb);
	}
};