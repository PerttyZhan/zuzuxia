

var mongoose = require('mongoose');

var personAppoint = require('../schemas/personAppoint');

var personAppointModel = mongoose.model('appointHistory',personAppoint);

module.exports = personAppointModel;