

var mongoose = require('mongoose');

var adminSchema = new mongoose.Schema({
	username:{
		type:String,
		default:''
	},
	email:{
		type:String,
		default:''
	},
	phone:{
		type:String,
		default:''
	},
	openid:{
		type:String,
		default:''
	},
	registerBy:{
		type:String,
		default:''
	},
	password:String,
	nameID:{
		type:mongoose.Schema.ObjectId,
		ref:'personInfo'
	},
	messageID:{
		type:mongoose.Schema.ObjectId,
		ref:'personMessage'
	},
	appointID:{
		type:mongoose.Schema.ObjectId,
		ref:'houseMessage'
	},
	registerTime:{
		type:String,
		default:''
	},
	bgimg:{
		type:String,
		default:'/image/personCenter/sense-img.png'
	}
});

module.exports = adminSchema;

adminSchema.pre('save',function(next){

	var year = new Date().getUTCFullYear();
	var month = new Date().getUTCMonth();
	month = month + 1;
	var day = new Date().getUTCDate();
	
	this.registerTime  = year + "-" + month  + "-" + day;

	next();
});

adminSchema.statics = {
	updateByUsername:function(user,_id,cb){
		return this
				.update( {username:user},{$set:{messageID:_id}} )
				.exec(cb);
	},
	findPersonByNameid:function(personID,cb){

		return this
				.find({_id : personID})
				.populate('nameID')
				.exec(cb);
	},
	findPersonByUsername:function(username,cb){

		return this
				.find({username : username})
				.populate('nameID')
				.exec(cb);
	},
	findMessageByUsername:function(username,cb){

		return this
				.find({username : username})
				.populate('messageID')
				.exec(cb);
	},
	valiUsernameAlive:function(username,cb){

		return this
				.find({'username':username})
				.count()
				.exec(cb);
	},
	valiUsernameIsRight:function(user,cb){
		return this
				.find({'username':user.username,'password':user.password})
				.populate('nameID')
				.exec(cb);
	},
	findRegisterIsOne:function(val,cb){
		return this
				.count({username:val})
				.exec(cb);
	},
	updateBgImg:function(username,img,cb){
		return this
				.update( {username:username},{$set:{bgimg:img}} )
				.populate('nameID')
				.exec(cb);
	},
	findIsRegisterByOpenId:function(openid,cb){
		return this
				.find({openid:openid})
				.populate('nameID')
				.exec(cb);
	},
	resetPassword:function(username,pass,cb){

		return this
				.update( {username:username},{$set:{password:pass}} )
				.exec(cb);
	}
}
