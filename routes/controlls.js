
/*
	路由器入口
*/
var db = require('../models/db');

/* 页面的控制 */
var shoueyeControl = require('./shouye');
var detailMessageControll = require('./detailMessage');
var centers = require('./center/index');
var managers = require('./manager/index');

/* 功能的控制 */
var adminControl = require('./adminControll');
var houseDone = require('./houseDone');
var uploadImg = require('./imgupload');
var house = require('./manager/house');

/* 手机上的 */
var phone = require('./app/index');

module.exports = function(app){

	app.route('/')
		.get(function(req,res){

			var deviceAgent = req.headers['user-agent'].toLowerCase(),
				agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);

			if(agentID){ 
				return res.redirect('/h5');			//指到手机、pad的网页
			}else{  
				return res.redirect('/pc'); 			//指到pc网页  
			}
		});

	phone(app);
	shoueyeControl(app);
	adminControl(app);
	managers(app);

	houseDone(app);
	detailMessageControll(app);
	centers(app);
	uploadImg(app);
	house(app);
	app.use(function (req, res) {
		res.render("404",{
			title:'Not Found'
		});
	});
};
