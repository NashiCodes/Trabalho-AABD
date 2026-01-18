const mongoose = require('mongoose');

const execucaoSchema = new mongoose.Schema(
  {
    alunoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Aluno',
      required: true,
    },
    treinoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Treino',
      required: true,
    },
    dataHora: {
      type: Date,
      default: Date.now,
    },
    duracaoReal: {
      type: Number,
      min: 0,
    },
    caloriasQueimadas: {
      type: Number,
      min: 0,
    },
    feedbackAluno: {
      type: String,
      trim: true,
    },
    dificuldadePercebida: {
      type: Number,
      min: 1,
      max: 10,
    },
    exerciciosRealizados: [
      {
        exercicioId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Exercicio',
          required: true,
        },
        seriesRealizadas: {
          type: Number,
          required: true,
          min: 0,
        },
        cargaUtilizada: {
          type: Number,
          min: 0,
        },
        observacoes: {
          type: String,
          trim: true,
        },
      },
    ],
    concluido: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: 'execucoes',
  }
);

// Índices
execucaoSchema.index({ alunoId: 1, dataHora: -1 });
execucaoSchema.index({ treinoId: 1 });
execucaoSchema.index({ dataHora: -1 });
execucaoSchema.index({ concluido: 1 });

const Execucao = mongoose.model('Execucao', execucaoSchema);

module.exports = Execucao;
