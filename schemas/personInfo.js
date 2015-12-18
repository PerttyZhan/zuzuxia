

var mongoose = require('mongoose');

var personInfo = new mongoose.Schema({
	// _id:mongoose.Schema.Types.ObjectId,  //主键
 //    _fk:mongoose.Schema.Types.ObjectId,  //外键
	name:{
		type:String,
		default:''
	},
	sex:{
		type:String,
		default:'男'
	},
	sign:{
		type:String,
		default:'',
	},
	school:{
		type:String,
		default:''
	},
	telephone:{
		type:String,
		default:'123456789'
	},
	marjor:{
		type:String,
		default:''
	},
	interset:{
		type:String,
		default:''
	},
	company:{
		type:String,
		default:''
	},
	job:{
		type:String,
		default:''
	}
});

module.exports = personInfo;


personInfo.statics = {
	updatePersonInfoById:function(arr,cb){

		console.log( arr ) ;
		var key = arr.key[1],
			set,
			query = { _id:arr.value[0] };

		if( key == 'name' ){
			set = { $set:{ name:arr.value[1] } };
		}else if( key == 'sex' ){
			set = { $set:{ sex:arr.value[1] } };
		}else if( key == 'sign' ){
			set = { $set:{ sign:arr.value[1] } };
		}else if( key == 'marjor' ){
			set = { $set:{ marjor:arr.value[1] } };
		}else if( key == 'interset' ){
			set = { $set:{ interset:arr.value[1] } };
		}else if( key == 'company' ){
			set = { $set:{ company:arr.value[1] } };
		}else if( key == 'job' ){
			set = { $set:{ job:arr.value[1] } };
		}else if( key == 'school' ){
			set = { $set:{ school:arr.value[1] } };
		}else if( key == 'telephone' ){
			set = { $set:{ telephone:arr.value[1] } };
		}else{
			set = {};
		}
		return this
				.update( query,set )
				.exec(cb);
	}
}
