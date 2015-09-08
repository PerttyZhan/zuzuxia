
var mongoose = require('mongoose');
var managerSchema = require('../schemas/managerAdmin');
var managerModel = mongoose.model('managerAdmin',managerSchema);

module.exports = managerModel ;