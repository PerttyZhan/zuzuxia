

var mongoose = require('mongoose');

var messageSchema  = require('../schemas/personMessage');

var personMessageModel = mongoose.model('personMessage',messageSchema);


module.exports = personMessageModel;

