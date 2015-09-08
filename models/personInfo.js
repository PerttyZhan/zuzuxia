

var personInfoSchema = require('../schemas/personInfo');
var mongoose = require('mongoose');

var personInfoModel = mongoose.model('personInfo',personInfoSchema);

module.exports = personInfoModel;