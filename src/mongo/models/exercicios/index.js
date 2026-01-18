const mongoose = require('mongoose');
const exercicioSchema = require('./schema');
const applyValidators = require('./validator');
const applyIndexes = require('./indexes');

applyValidators(exercicioSchema);
applyIndexes(exercicioSchema);

const Exercicio = mongoose.model('Exercicio', exercicioSchema);

module.exports = Exercicio;
