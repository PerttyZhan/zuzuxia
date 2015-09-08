

var mongoose = require('mongoose');
var personAppoint = new mongoose.Schema({
	user:String,
	createTime:{
		type:String,
		default:''
	},
	houseID:{
		type:mongoose.Schema.ObjectId,
		ref:'houseMessage'
	}
});

module.exports = personAppoint;

personAppoint.pre('save',function(next){

	var year = new Date().getUTCFullYear();
	var month = new Date().getUTCMonth();
	month = month + 1;
	var day = new Date().getUTCDate();
	
	this.createTime  = year + "-" + month  + "-" + day;

	next();
});

personAppoint.statics = {

	findIsAlive:function(username,_id,cb){

		return this
				.count({user:username,houseID:_id})
				.exec(cb);
	},
	removeAppoint:function(username,_id,cb){
		return this
				.remove({user:username,houseID:_id})
				.exec(cb);
	},
	findAppointByUsername:function(username,cb){
		return this
				.find({user:username})
				.populate('houseID')
				.exec(cb);
	}

};