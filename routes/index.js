/*
	路由器入口
*/
var db = require('../models/db');

/* 页面的控制 */
var webControlls = require('./webControlls');
var managerControlls = require('./managerControlls');

/* 功能的控制 */
var personControlls = require('./personControlls');
var houseControlls = require('./houseControlls');
var adminControlls = require('./adminControlls');
var utils = require('./utils');

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
	webControlls(app);
	managerControlls(app);
	personControlls(app);
	houseControlls(app);
	adminControlls(app)
	utils(app);

	app.use(function (req, res) {
		// res.render("404",{
		// 	title:'Not Found'
		// });
		res.status(404);
     	res.end();
	});

}