

var mongoose = require('mongoose');
var personAppoint = new mongoose.Schema({
	userID:{
		type:mongoose.Schema.ObjectId,
		ref:'personInfo'
	},
	name:{
		type:String,
		default:''
	},
	telephone:{
		type:String,
		default:''
	},
	area:{
		type:String,
		default:''
	},
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
	findAppointByUsername:function(userID,count,cb){
		return this
				.find({userID:userID})
				.populate('houseID')
				.populate('userID')
				.sort({createTime:-1})
				// .skip( (count -1)*5 )
				// .limit(5)
				.exec(cb);
	},
	findAll:function(cb){
		return this
				.find({})
				.populate('houseID')
				.populate('userID')
				.sort({createTime:-1})
				.exec(cb);
	}

};