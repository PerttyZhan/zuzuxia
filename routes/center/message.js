/*
	消息里面的事件
*/
var personMessage = require('../models/personMessage');

module.exports = function(){

	app.route('/reviseMessageStatus')
		.post(function(req,res){

			var _id = req.body._id;

			personMessage.updateIsCheckById(_id,true,function(err,message){

				if( err ){
					return console.log( err );
				}

			});

		});
}