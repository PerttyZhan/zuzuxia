
var mongoose = require('mongoose');
var collectSchema = require('../schemas/personCollect');
var collectModel = mongoose.model('personCollect',collectSchema);

module.exports = collectModel;