const mongoose = require('mongoose');

const educadorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  cref: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  especialidades: {
    type: [String],
    default: []
  },
  contato: {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    telefone: {
      type: String,
      required: true,
      trim: true
    }
  },
  dataCadastro: {
    type: Date,
    default: Date.now
  },
  alunosAtivos: {
    type: Number,
    default: 0,
    min: 0
  },
  avaliacaoMedia: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  }
}, {
  timestamps: true,
  collection: 'educadores'
});

// Índices
educadorSchema.index({ especialidades: 1 });

const Educador = mongoose.model('Educador', educadorSchema);

module.exports = Educador;
