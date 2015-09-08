

var mongoose = require('mongoose');
var personMessage = new mongoose.Schema({
	username:String,
	title:String,
	content:String,
	createTime:{
		type:String,
		default:''
	},
	isCheck:{
		type:Boolean,
		default:false
	}
});

personMessage.pre('save',function(next){
	
	var year = new Date().getUTCFullYear();
	var month = new Date().getUTCMonth();
	month = month + 1;
	var day = new Date().getUTCDate();
	this.createTime  = year + "-" + month  + "-" + day;
	next();

});

module.exports = personMessage;



personMessage.statics = {

	findMessageByUsername:function(username,cb){

		return this
				.find({username:username})
				.exec(cb);
	},
	updateIsCheckById:function(_id,sign,cb){
		return this
				.update( {_id:_id},{ $set:{ isCheck:true } } )
				.exec(cb);
	}
};

