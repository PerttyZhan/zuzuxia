
var filter = require('./filter');
var admin = require('./admin');

module.exports = function(app){

	app.route('/pc/admin/loginin')
		.post(admin.loginin);
}