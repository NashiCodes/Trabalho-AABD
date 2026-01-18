const mongoose = require('mongoose');

const notificacaoSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'usuarioTipo'
  },
  usuarioTipo: {
    type: String,
    required: true,
    enum: ['Educador', 'Aluno']
  },
  tipo: {
    type: String,
    required: true,
    enum: ['lembrete_treino', 'nova_mensagem', 'avaliacao_pendente', 'meta_atingida', 'outro']
  },
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  mensagem: {
    type: String,
    required: true,
    trim: true
  },
  lida: {
    type: Boolean,
    default: false
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  },
  dataLeitura: {
    type: Date
  },
  link: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  collection: 'notificacoes'
});

// Índices
notificacaoSchema.index({ usuarioId: 1, lida: 1, dataCriacao: -1 });
notificacaoSchema.index({ tipo: 1 });

const Notificacao = mongoose.model('Notificacao', notificacaoSchema);

module.exports = Notificacao;
