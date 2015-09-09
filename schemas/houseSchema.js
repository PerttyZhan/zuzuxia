
var mongoose = require('mongoose');

var houserSchema = new mongoose.Schema({
	title:{
		type:String,
		default:''
	},
	summary:{
		type:String,
		default:''
	},
	keywords:{
		type:[String],
		default:[]
	},
	price:{
		type:String,
		default:''
	},
	des:{
		type:[String],
		default:[]
	},
	require:{
		type:[String],
		default:[]
	},
	address:{
		type:String,
		default:''
	},
	houseconfig:{
		type:mongoose.Schema.ObjectId,
		ref:'houseconfig'
	},
	area:{
		type:String,
		default:''
	},
	coverUrl:{
		type:String,
		default:'/image/1438176413433.jpg',
	},
	scollUrl:{
		type:[String],
		default:['','','','']
	},
	recodeTime:{
		type:String,
		default:''
	},
	status:{
		type:String,
		default:1
	},
	aptNum:{
		type:String,
		default:'0'
	}
});

//status 1--未上架 2--已上架 3--删除了
module.exports = houserSchema;


houserSchema.pre('save',function(next){

	var year = new Date().getUTCFullYear();
	var month = new Date().getUTCMonth();
	month = month + 1;
	var day = new Date().getUTCDate();
	
	this.recodeTime  = year + "-" + month  + "-" + day;

	next();
});

houserSchema.statics = {
	findHouseByArea:function(area,cb){
		// area:/杭州/i,
		return this
				.find({status:'2'})
				.exec(cb);
	},
	findHouseById:function(_id,cb){

		console.log( _id );
		return this
				.find({_id:_id})
				.populate('houseconfig')
				.exec(cb);
	},
	fetch:function(cb){

		return this
				.find({ status:{ $ne:'3' } })
				.exec(cb);
	},
	updateById:function(_id,key,val,cb){

		var set,
			query = { _id:_id };

		if( key == 'title' ){
			set = { $set:{ title:val } };
		}else if( key == 'summary' ){
			set = { $set:{ summary:val } };
		}else if( key == 'keywords' ){

			var vals = val.split(',');
			var arr = [];
			for( var i=0;i<vals.length;i++ ){
				arr.push( vals[i] );
			}
			set = { $set:{ keywords:arr } };

		}else if( key == 'price' ){
			set = { $set:{ price:val } };
		}else if( key == 'des' ){

			var vals = val.split(',');
			var arr = [];
			for( var i=0;i<vals.length;i++ ){
				arr.push( vals[i] );
			}
			set = { $set:{ des:arr } };

		}else if( key == 'require' ){

			var vals = val.split(',');
			var arr = [];
			for( var i=0;i<vals.length;i++ ){
				arr.push( vals[i] );
			}
			set = { $set:{ require:arr } };

		}else if( key == 'address' ){
			set = { $set:{ address:val } };
		}else if( key == 'scollUrl' ){

			var vals = val.split(',');
			var arr = [];
			for( var i=0;i<vals.length;i++ ){
				arr.push( vals[i] );
			}

			set = { $set:{ scollUrl:arr } };
		}else if( key == 'coverUrl' ){
			set = { $set:{ coverUrl:val } };
		}

		console.log( query );
		console.log( set );
		return this
				.update(query,set)
				.exec(cb);
	},
	updateStatusById:function(_id,val,cb){
		return this
				.update( { _id:_id },{ $set:{ status:val } } )
				.exec(cb);
	}
}
