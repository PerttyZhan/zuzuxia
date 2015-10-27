
var mongoose = require('mongoose');
var pageSchema = require('../schemas/pageSet');
var pageModel = mongoose.model('pageset',pageSchema);

module.exports = pageModel;
