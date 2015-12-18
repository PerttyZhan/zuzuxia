
var mongoose = require('mongoose');

var houseconfig = require('../schemas/houseConfig');

var configModel = mongoose.model('houseconfig',houseconfig);

module.exports = configModel;