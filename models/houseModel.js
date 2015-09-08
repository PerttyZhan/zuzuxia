

var mongoose = require('mongoose');
var houseSchema = require('../schemas/houseSchema');

var houseModel = mongoose.model('houseMessage',houseSchema);

module.exports = houseModel;