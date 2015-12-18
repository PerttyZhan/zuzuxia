
/* 人物控制 */
var person = require('./person');
var filter = require('./filter');
module.exports = function(app){

	//登录
	app.route('/person/loginin')
		.post( person.loginin );
	//注册
	app.route('/person/register')
		.post( person.register );
	//退出
	app.route('/person/loginout')
		.get( filter.sessionIsAlive,person.loginout );
	//修改密码
	app.route('/person/resetPwd')
		.post( person.resetPwd );
	//查看个人信息
	app.route('/person/showInfo')
		.get( filter.sessionIsAlive,person.showInfo );
	//查看个人短信
	app.route('/person/showMessage')
		.get( filter.sessionIsAlive,person.showMessage );
	//查看个人收藏
	app.route('/person/showColls')
		.get( filter.sessionIsAlive,person.showColls );
	//查看个人预约
	app.route('/person/showApt')
		.get( filter.sessionIsAlive,person.showApt );
	//更新信息
	app.route('/person/updateInfo')
		.post( filter.sessionIsAlive,person.updateInfo );
	//更改个人的背景
	app.route('/person/changeBg')
		.post( filter.sessionIsAlive,person.changeBg );

}