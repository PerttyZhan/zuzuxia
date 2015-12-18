
/* 人物控制 */
var house = require('./house');
var filter = require('./filter');

module.exports = function(app){

	//首页的预约
	app.post( '/house/indexApt',house.indexApt );
	//详情页的预约
	app.post( '/house/detailApt',house.detailApt );
	//手机端的预约
	app.post( '/house/phoneApt',filter.sessionIsAlive,house.phoneApt );
	//收藏房子
	app.post( '/house/clthouse',filter.sessionIsAlive,house.clthouse );
	//删除收藏
	app.post( '/house/deleCltHouse',filter.sessionIsAlive,house.deleCltHouse );
	//房子的展示
	app.route('/house/show/:_id')
		.get( house.detailHouse );
}