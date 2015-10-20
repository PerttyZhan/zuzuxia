

var mongoose = require('mongoose');
var personAppoint = new mongoose.Schema({
	user:String,
	telephone:{
		type:String,
		default:''
	},
	area:{
		type:String,
		default:''
	},
	startTime:{
		type:String,
		default:''
	},
	endTime:{
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
	},
	state:{
		type:String,
		default:'入住申请'
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
	findAppointByUsername:function(username,count,cb){
		return this
				.find({user:username})
				.populate('houseID')
				.sort({createTime:-1})
				// .skip( (count -1)*5 )
				// .limit(5)
				.exec(cb);
	},
	findAll:function(cb){
		return this
				.find({})
				.populate('houseID')
				.sort({createTime:-1})
				.exec(cb);
	}

};