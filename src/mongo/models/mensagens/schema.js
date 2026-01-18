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
    assunto: {
      type: String,
      trim: true,
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
    arquivosAnexos: [
      {
        nome: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        tipo: {
          type: String,
          enum: ['imagem', 'video', 'documento', 'outro'],
          default: 'outro',
        },
      },
    ],
  },
  {
    timestamps: true,
    collection: 'mensagens',
  }
);

module.exports = mensagemSchema;
