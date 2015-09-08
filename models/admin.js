

var adminSchema = require('../schemas/adminSchema');
var mongoose = require('mongoose');

var adminModel = mongoose.model('admin',adminSchema);

module.exports = adminModel;