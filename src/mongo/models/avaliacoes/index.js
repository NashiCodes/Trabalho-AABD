const mongoose = require('mongoose');
const avaliacaoSchema = require('./schema');
const applyValidators = require('./validator');
const applyIndexes = require('./indexes');

applyValidators(avaliacaoSchema);

applyIndexes(avaliacaoSchema);

const Avaliacao = mongoose.model('Avaliacao', avaliacaoSchema);

module.exports = Avaliacao;
