const mongoose = require('mongoose');
const treinoSchema = require('./schema');
const applyValidators = require('./validator');
const applyIndexes = require('./indexes');

applyValidators(treinoSchema);
applyIndexes(treinoSchema);

const Treino = mongoose.model('Treino', treinoSchema);

module.exports = Treino;
