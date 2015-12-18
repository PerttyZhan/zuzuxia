
var mongoose = require('mongoose');
var pageSchema = new mongoose.Schema({
	bannerUrl:{
		type:[String],
		default:['','','','']
	}
});


module.exports = pageSchema;

pageSchema.statics = {
	fetch:function(cb){
		return this
				.find({})
				.exec(cb);
	},
	updateById:function(_id,key,val,cb){

		var query,vals,arr = [],set;

		query = { _id:_id };

		if( key == 'bannerUrl' ){
			set = { $set:{ bannerUrl:val } };
		}
	
		return this
				.update( query,set )
				.exec(cb);

	},
	counts:function(cb){
		return this
				.count({})
				.exec(cb);
	}
};