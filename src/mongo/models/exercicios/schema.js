const mongoose = require('mongoose');

const exercicioSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    grupoMuscular: {
      type: [String],
      required: true,
    },
    tipo: {
      type: String,
      enum: ['Anaeróbico', 'Aeróbico', 'Misto'],
      required: true,
    },
    equipamento: {
      type: [String],
      default: [],
    },
    descricaoTecnica: {
      type: String,
      trim: true,
    },
    nivelDificuldade: {
      type: String,
      enum: ['Iniciante', 'Intermediário', 'Avançado'],
      default: 'Intermediário',
    },
    videoUrl: {
      type: String,
      trim: true,
    },
    calorias100kg: {
      type: Number,
      min: 0,
    },
  },
  {
    timestamps: true,
    collection: 'exercicios',
  }
);

module.exports = exercicioSchema;
