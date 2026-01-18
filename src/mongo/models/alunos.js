const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  educadorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Educador',
    required: true
  },
  dadosPessoais: {
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
    },
    dataNascimento: {
      type: Date,
      required: true
    },
    genero: {
      type: String,
      enum: ['M', 'F', 'Outro'],
      required: true
    }
  },
  dadosFisicos: {
    peso: {
      type: Number,
      required: true,
      min: 0
    },
    altura: {
      type: Number,
      required: true,
      min: 0
    },
    imc: {
      type: Number,
      min: 0
    }
  },
  objetivos: {
    type: [String],
    default: []
  },
  nivel: {
    type: String,
    enum: ['Iniciante', 'Intermediário', 'Avançado'],
    default: 'Iniciante'
  },
  restricoesMedicas: {
    type: [String],
    default: []
  },
  historicoAvaliacoes: [{
    data: {
      type: Date,
      default: Date.now
    },
    peso: Number,
    percentualGordura: Number,
    massaMuscular: Number,
    circunferencias: {
      braco: Number,
      perna: Number,
      cintura: Number
    }
  }]
}, {
  timestamps: true,
  collection: 'alunos'
});

// Índices
alunoSchema.index({ educadorId: 1 });
alunoSchema.index({ nivel: 1 });
alunoSchema.index({ objetivos: 1 });

const Aluno = mongoose.model('Aluno', alunoSchema);

module.exports = Aluno;
