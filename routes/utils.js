
var mailSend = require('../models/sendEmail');


module.exports = function(app){
	app.route('/sendMessage')
		.post(function(req,res){
			var _src= req.body.src;
			var random = '';
			for( var i=0;i<6;i++){
				random += Math.floor( Math.random()*10 );
			}
			var mail = mailSend(_src,random);

			mail.transport.sendMail(mail.options, function(error, response){
			    if(error){
			        console.log(error);

			        return res.send({
			        	msg:'no'
			        });
			    }else{
			    	 return res.send({
			    	 	msg:'yes',
			    	 	val:random
			    	 });
			    }

			    // if you don't want to use this transport object anymore, uncomment following line
			    mail.transport.close(); 
			});
		});

}