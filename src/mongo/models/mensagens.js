const mongoose = require('mongoose');

const mensagemSchema = new mongoose.Schema(
  {
    remetenteId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'remetenteTipo',
    },
    remetenteTipo: {
      type: String,
      required: true,
      enum: ['Educador', 'Aluno'],
    },
    destinatarioId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'destinatarioTipo',
    },
    destinatarioTipo: {
      type: String,
      required: true,
      enum: ['Educador', 'Aluno'],
    },
    conteudo: {
      type: String,
      required: true,
      trim: true,
    },
    dataHora: {
      type: Date,
      default: Date.now,
    },
    lida: {
      type: Boolean,
      default: false,
    },
    dataLeitura: {
      type: Date,
    },
  },
  {
    timestamps: true,
    collection: 'mensagens',
  }
);

// Índices
mensagemSchema.index({ destinatarioId: 1, lida: 1, dataHora: -1 });
mensagemSchema.index({ remetenteId: 1, dataHora: -1 });

const Mensagem = mongoose.model('Mensagem', mensagemSchema);

module.exports = Mensagem;
