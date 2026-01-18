const mongoose = require('mongoose');

const treinoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    criadoPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Educador',
      required: true,
    },
    descricao: {
      type: String,
      trim: true,
    },
    nivel: {
      type: String,
      enum: ['Iniciante', 'Intermediário', 'Avançado'],
      default: 'Intermediário',
    },
    objetivo: {
      type: String,
      required: true,
      trim: true,
    },
    duracaoEstimada: {
      type: Number,
      min: 0,
    },
    caloriasEstimadas: {
      type: Number,
      min: 0,
    },
    exercicios: [
      {
        exercicioId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Exercicio',
          required: true,
        },
        nome: {
          type: String,
          required: true,
        },
        series: {
          type: Number,
          required: true,
          min: 1,
        },
        repeticoes: {
          type: String,
          required: true,
        },
        carga: {
          type: String,
          default: 'a definir',
        },
        descanso: {
          type: Number,
          min: 0,
        },
        ordem: {
          type: Number,
          required: true,
          min: 1,
        },
        observacoes: {
          type: String,
          trim: true,
        },
      },
    ],
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: 'treinos',
  }
);

module.exports = treinoSchema;
