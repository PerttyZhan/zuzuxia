


var filter = {
	siteIsAlive:function(req,res,next){

	},
	sessionIsAlive:function(req,res,next){
		if( !!req.session.user ){
			next();
		}else{
			res.redirect('/');
		}
	},
	managerSession:function(req,res,next){
		if( !!req.session.managerUser ){
			next();
		}else{
			res.redirect('/pc/manager/login');
		}
	},
	managerUser:function(req,res,next){
		if( !!req.session.managerUser ){
			res.redirect('/pc/manager/login/house');
		}else{
			res.redirect('/pc/manager/login');
		}
	}
};
module.exports = filter;

