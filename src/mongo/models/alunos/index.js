const mongoose = require('mongoose');
const { alunoSchema } = require('./schema');
const { applyValidators } = require('./validator');
const { applyIndexes } = require('./indexes');

// Aplicar validadores (hooks)
applyValidators(alunoSchema);

// Aplicar índices
applyIndexes(alunoSchema);

// Criar modelo
const Aluno = mongoose.model('Aluno', alunoSchema);

module.exports = Aluno;
