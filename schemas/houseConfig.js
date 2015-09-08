
var mongoose = require('mongoose');

var houseConfigSchema = new mongoose.Schema({
	internet:{
		type:String,
		default:''
	},
	electri:{
		type:[String],
		default:[]
	},
	furniture:{
		type:[String],
		default:[]
	},
	other:{
		type:[String],
		default:[]
	}
});


module.exports = houseConfigSchema;

houseConfigSchema.statics = {

	updateById:function(_id,key,val,cb){

		var query = { _id:_id },set;

		if( key == 'internet'){

			set = { $set:{ internet:val } };

		}else if( key == 'furniture'){

			var vals = val.split(',');
			var arr = [];
			for( var i=0;i<vals.length;i++ ){
				if( vals[i] == '填点。。' ){
					vals[i] = "";
				}
				arr.push( vals[i] );
			}
			set = { $set:{ furniture:arr } };

		}else if( key == 'electri'){

			var vals = val.split(',');
			var arr = [];
			for( var i=0;i<vals.length;i++ ){
				if( vals[i] == '填点。。' ){
					vals[i] = "";
				}
				arr.push( vals[i] );
			}
			set = { $set:{ electri:arr } };

		}else{

			var vals = val.split(',');
			var arr = [];
			for( var i=0;i<vals.length;i++ ){
				if( vals[i] == '填点。。' ){
					vals[i] = "";
				}
				arr.push( vals[i] );
			}
			set = { $set:{ other:arr } };

		}

		return this
				.update( query,set )
				.exec(cb);
	}
};



