const mongoose = require('mongoose');

const avaliacaoSchema = new mongoose.Schema(
  {
    alunoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Aluno',
      required: true,
    },
    educadorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Educador',
      required: true,
    },
    nota: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comentario: {
      type: String,
      trim: true,
    },
    dataAvaliacao: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: 'avaliacoes',
  }
);

// Índices
avaliacaoSchema.index({ educadorId: 1 });
avaliacaoSchema.index({ alunoId: 1 });
avaliacaoSchema.index({ dataAvaliacao: -1 });

const Avaliacao = mongoose.model('Avaliacao', avaliacaoSchema);

module.exports = Avaliacao;
