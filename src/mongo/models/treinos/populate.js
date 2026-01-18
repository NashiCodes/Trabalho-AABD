const Treino = require('./index');
const Educador = require('../educadores/index');
const Exercicio = require('../exercicios/index');

const populateTreinos = async () => {
  // Buscar educadores e exercícios existentes
  const educadores = await Educador.find().limit(3);
  const exercicios = await Exercicio.find();

  if (educadores.length === 0) {
    throw new Error('Nenhum educador encontrado. Popule os educadores primeiro.');
  }

  if (exercicios.length === 0) {
    throw new Error('Nenhum exercício encontrado. Popule os exercícios primeiro.');
  }

  const treinos = [
    {
      nome: 'Treino A - Peito e Tríceps',
      criadoPor: educadores[0]._id,
      descricao: 'Treino focado em peitoral e tríceps para iniciantes',
      nivel: 'Iniciante',
      objetivo: 'Ganho de massa muscular',
      duracaoEstimada: 60,
      caloriasEstimadas: 350,
      exercicios: [
        {
          exercicioId: exercicios[0]._id,
          nome: exercicios[0].nome,
          series: 3,
          repeticoes: '12',
          carga: '40kg',
          descanso: 90,
          ordem: 1,
        },
        {
          exercicioId: exercicios[3]._id,
          nome: exercicios[3].nome,
          series: 3,
          repeticoes: '15',
          carga: '20kg',
          descanso: 60,
          ordem: 2,
        },
      ],
      tags: ['peito', 'triceps', 'hipertrofia'],
    },
    {
      nome: 'Treino B - Costas e Bíceps',
      criadoPor: educadores[0]._id,
      descricao: 'Treino para desenvolvimento de costas e bíceps',
      nivel: 'Intermediário',
      objetivo: 'Hipertrofia',
      duracaoEstimada: 70,
      caloriasEstimadas: 400,
      exercicios: [
        {
          exercicioId: exercicios[6]._id,
          nome: exercicios[6].nome,
          series: 4,
          repeticoes: '10',
          carga: '60kg',
          descanso: 90,
          ordem: 1,
        },
        {
          exercicioId: exercicios[3]._id,
          nome: exercicios[3].nome,
          series: 3,
          repeticoes: '12',
          carga: '25kg',
          descanso: 60,
          ordem: 2,
        },
      ],
      tags: ['costas', 'biceps', 'dorsais'],
    },
    {
      nome: 'Treino C - Pernas Completo',
      criadoPor: educadores[1]._id,
      descricao: 'Treino intenso de membros inferiores',
      nivel: 'Avançado',
      objetivo: 'Força e hipertrofia',
      duracaoEstimada: 90,
      caloriasEstimadas: 550,
      exercicios: [
        {
          exercicioId: exercicios[1]._id,
          nome: exercicios[1].nome,
          series: 5,
          repeticoes: '8',
          carga: '100kg',
          descanso: 120,
          ordem: 1,
        },
        {
          exercicioId: exercicios[2]._id,
          nome: exercicios[2].nome,
          series: 4,
          repeticoes: '10',
          carga: '120kg',
          descanso: 120,
          ordem: 2,
        },
      ],
      tags: ['pernas', 'agachamento', 'forca'],
    },
    {
      nome: 'Treino D - Ombros e Abdômen',
      criadoPor: educadores[1]._id,
      descricao: 'Trabalho de ombros e core',
      nivel: 'Intermediário',
      objetivo: 'Definição muscular',
      duracaoEstimada: 50,
      caloriasEstimadas: 300,
      exercicios: [
        {
          exercicioId: exercicios[4]._id,
          nome: exercicios[4].nome,
          series: 4,
          repeticoes: '12',
          carga: '30kg',
          descanso: 75,
          ordem: 1,
        },
        {
          exercicioId: exercicios[7]._id,
          nome: exercicios[7].nome,
          series: 4,
          repeticoes: '20',
          carga: 'peso corporal',
          descanso: 45,
          ordem: 2,
        },
      ],
      tags: ['ombros', 'abdomen', 'core'],
    },
    {
      nome: 'Treino HIIT - Emagrecimento',
      criadoPor: educadores[2]._id,
      descricao: 'Treino intervalado de alta intensidade',
      nivel: 'Avançado',
      objetivo: 'Emagrecimento',
      duracaoEstimada: 30,
      caloriasEstimadas: 450,
      exercicios: [
        {
          exercicioId: exercicios[8]._id,
          nome: exercicios[8].nome,
          series: 5,
          repeticoes: '15',
          carga: 'peso corporal',
          descanso: 30,
          ordem: 1,
        },
        {
          exercicioId: exercicios[5]._id,
          nome: exercicios[5].nome,
          series: 1,
          repeticoes: '10 minutos',
          carga: 'N/A',
          descanso: 0,
          ordem: 2,
        },
      ],
      tags: ['hiit', 'emagrecimento', 'cardio'],
    },
    {
      nome: 'Treino Full Body Iniciante',
      criadoPor: educadores[0]._id,
      descricao: 'Treino de corpo inteiro para iniciantes',
      nivel: 'Iniciante',
      objetivo: 'Condicionamento geral',
      duracaoEstimada: 45,
      caloriasEstimadas: 280,
      exercicios: [
        {
          exercicioId: exercicios[0]._id,
          nome: exercicios[0].nome,
          series: 2,
          repeticoes: '15',
          carga: '30kg',
          descanso: 60,
          ordem: 1,
        },
        {
          exercicioId: exercicios[1]._id,
          nome: exercicios[1].nome,
          series: 2,
          repeticoes: '12',
          carga: '40kg',
          descanso: 75,
          ordem: 2,
        },
        {
          exercicioId: exercicios[7]._id,
          nome: exercicios[7].nome,
          series: 3,
          repeticoes: '15',
          carga: 'peso corporal',
          descanso: 45,
          ordem: 3,
        },
      ],
      tags: ['fullbody', 'iniciante', 'geral'],
    },
    {
      nome: 'Treino Core e Estabilidade',
      criadoPor: educadores[2]._id,
      descricao: 'Fortalecimento do core e estabilidade',
      nivel: 'Intermediário',
      objetivo: 'Fortalecimento',
      duracaoEstimada: 40,
      caloriasEstimadas: 220,
      exercicios: [
        {
          exercicioId: exercicios[9]._id,
          nome: exercicios[9].nome,
          series: 4,
          repeticoes: '45 segundos',
          carga: 'peso corporal',
          descanso: 60,
          ordem: 1,
          observacoes: 'Manter corpo alinhado',
        },
        {
          exercicioId: exercicios[7]._id,
          nome: exercicios[7].nome,
          series: 4,
          repeticoes: '25',
          carga: 'peso corporal',
          descanso: 45,
          ordem: 2,
        },
      ],
      tags: ['core', 'estabilidade', 'funcional'],
    },
    {
      nome: 'Treino Força Powerlifting',
      criadoPor: educadores[1]._id,
      descricao: 'Treino focado nos 3 levantamentos básicos',
      nivel: 'Avançado',
      objetivo: 'Ganho de força',
      duracaoEstimada: 120,
      caloriasEstimadas: 600,
      exercicios: [
        {
          exercicioId: exercicios[1]._id,
          nome: exercicios[1].nome,
          series: 5,
          repeticoes: '5',
          carga: '140kg',
          descanso: 180,
          ordem: 1,
        },
        {
          exercicioId: exercicios[0]._id,
          nome: exercicios[0].nome,
          series: 5,
          repeticoes: '5',
          carga: '100kg',
          descanso: 180,
          ordem: 2,
        },
        {
          exercicioId: exercicios[2]._id,
          nome: exercicios[2].nome,
          series: 5,
          repeticoes: '5',
          carga: '160kg',
          descanso: 180,
          ordem: 3,
        },
      ],
      tags: ['powerlifting', 'forca', 'competicao'],
    },
  ];

  try {
    await Treino.deleteMany({});
    const treinosInseridos = await Treino.insertMany(treinos);
    console.log(`✅ ${treinosInseridos.length} treinos populados com sucesso!`);
    return treinosInseridos;
  } catch (error) {
    console.error('❌ Erro ao popular treinos:', error);
    throw error;
  }
};

module.exports = { populateTreinos };
