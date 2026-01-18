const mongoose = require('mongoose');
const educadorSchema = require('./schema');
const applyValidators = require('./validator');
const applyIndexes = require('./indexes');

applyValidators(educadorSchema);
applyIndexes(educadorSchema);

const Educador = mongoose.model('Educador', educadorSchema);

module.exports = Educador;
