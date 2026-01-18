const mongoose = require('mongoose');
const notificacaoSchema = require('./schema');
const applyValidators = require('./validator');
const applyIndexes = require('./indexes');

applyValidators(notificacaoSchema);
applyIndexes(notificacaoSchema);

const Notificacao = mongoose.model('Notificacao', notificacaoSchema);

module.exports = Notificacao;
