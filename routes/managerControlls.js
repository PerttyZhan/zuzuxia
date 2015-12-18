
var filter = require('./filter');
var manager = require('./manager');
module.exports = function(app){

	app.route('/pc/manager/login/house')
		.get(filter.managerSession,manager.menuHouse);

	app.route('/pc/manager/login/house/show')
		.get(filter.managerSession,manager.house);

	app.route('/pc/manager/login/house/new')
		.get(filter.managerSession,manager.newHouse);

	app.route('/pc/manager/login/house/:_id')
		.get(filter.managerSession,manager.showHouse);

	app.route('/pc/manager/login/house/update')
		.post(filter.managerSession,manager.updateHouse);

	app.route('/pc/manager/login/banner/show')
		.get(filter.managerSession,manager.setBanner);

	app.route('/pc/manager/login/banner/update')
		.post(filter.managerSession,manager.bannerUpdate);

	app.route('/pc/manager/login/aptManager/show')
		.get(filter.managerSession,manager.aptManager);

	app.route('/pc/manager/login/house/updateImg')
		.post(filter.managerSession,manager.updateImg);

	app.route('/pc/manager/login/house/changeStatus')
		.post(filter.managerSession,manager.changeStatus)
}