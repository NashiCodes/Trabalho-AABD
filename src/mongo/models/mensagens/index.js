const mongoose = require('mongoose');
const mensagemSchema = require('./schema');
const applyValidators = require('./validator');
const applyIndexes = require('./indexes');

applyValidators(mensagemSchema);
applyIndexes(mensagemSchema);

const Mensagem = mongoose.model('Mensagem', mensagemSchema);

module.exports = Mensagem;
