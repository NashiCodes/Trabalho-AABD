const mongoose = require('mongoose');
const { alunoSchema } = require('./schema');
const { applyValidators } = require('./validator');
const { applyIndexes } = require('./indexes');

applyValidators(alunoSchema);

applyIndexes(alunoSchema);

const Aluno = mongoose.model('Aluno', alunoSchema);

module.exports = Aluno;
