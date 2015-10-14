
var mongoose = require('mongoose');
var collecSchema = new mongoose.Schema({
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

module.exports = collecSchema;

collecSchema.pre('save',function(next){

	var year = new Date().getUTCFullYear();
	var month = new Date().getUTCMonth();
	month = month + 1;
	var day = new Date().getUTCDate();
	
	this.createTime  = year + "-" + month  + "-" + day;

	next();
});

collecSchema.statics = {

	findIsAlive:function(username,_id,cb){

		if( username == undefined ){
			username = 'undefined';
		}
		return this
				.count({user:username,houseID:_id})
				.exec(cb);
	},
	findCollectByUserName:function(username,cb){

		return this
				.find({user:username})
				.populate('houseID')
				.exec(cb);
	}

};