const mongoose = require('mongoose');
const execucaoSchema = require('./schema');
const applyValidators = require('./validator');
const applyIndexes = require('./indexes');

applyValidators(execucaoSchema);
applyIndexes(execucaoSchema);

const Execucao = mongoose.model('Execucao', execucaoSchema);

module.exports = Execucao;
