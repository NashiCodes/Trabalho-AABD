const Execucao = require('./index');
const Aluno = require('../alunos/index');
const Treino = require('../treinos/index');
const Exercicio = require('../exercicios/index');

const populateExecucoes = async () => {
  // Buscar alunos, treinos e exercícios existentes
  const alunos = await Aluno.find().limit(5);
  const treinos = await Treino.find().limit(5);
  const exercicios = await Exercicio.find().limit(5);

  if (alunos.length === 0) {
    throw new Error('Nenhum aluno encontrado. Popule os alunos primeiro.');
  }

  if (treinos.length === 0) {
    throw new Error('Nenhum treino encontrado. Popule os treinos primeiro.');
  }

  if (exercicios.length === 0) {
    throw new Error('Nenhum exercício encontrado. Popule os exercícios primeiro.');
  }

  const execucoes = [
    {
      alunoId: alunos[0]._id,
      treinoId: treinos[0]._id,
      dataHora: new Date('2025-12-15T08:00:00'),
      duracaoReal: 65,
      caloriasQueimadas: 370,
      feedbackAluno: 'Treino excelente, me senti muito bem!',
      dificuldadePercebida: 7,
      exerciciosRealizados: [
        {
          exercicioId: exercicios[0]._id,
          seriesRealizadas: 3,
          cargaUtilizada: 40,
          observacoes: 'Consegui manter boa forma',
        },
        {
          exercicioId: exercicios[1]._id,
          seriesRealizadas: 3,
          cargaUtilizada: 20,
        },
      ],
      concluido: true,
    },
    {
      alunoId: alunos[1]._id,
      treinoId: treinos[1]._id,
      dataHora: new Date('2025-12-16T18:30:00'),
      duracaoReal: 75,
      caloriasQueimadas: 420,
      feedbackAluno: 'Treino puxado, mas consegui completar.',
      dificuldadePercebida: 8,
      exerciciosRealizados: [
        {
          exercicioId: exercicios[2]._id,
          seriesRealizadas: 4,
          cargaUtilizada: 60,
        },
      ],
      concluido: true,
    },
    {
      alunoId: alunos[2]._id,
      treinoId: treinos[2]._id,
      dataHora: new Date('2025-12-17T07:00:00'),
      duracaoReal: 95,
      caloriasQueimadas: 580,
      feedbackAluno: 'Treino intenso de pernas, estou exausto mas satisfeito!',
      dificuldadePercebida: 9,
      exerciciosRealizados: [
        {
          exercicioId: exercicios[0]._id,
          seriesRealizadas: 5,
          cargaUtilizada: 100,
          observacoes: 'Última série foi desafiadora',
        },
        {
          exercicioId: exercicios[1]._id,
          seriesRealizadas: 4,
          cargaUtilizada: 120,
        },
      ],
      concluido: true,
    },
    {
      alunoId: alunos[3]._id,
      treinoId: treinos[3]._id,
      dataHora: new Date('2025-12-18T19:00:00'),
      duracaoReal: 55,
      caloriasQueimadas: 310,
      feedbackAluno: 'Bom treino, foco em ombros foi ótimo.',
      dificuldadePercebida: 6,
      exerciciosRealizados: [
        {
          exercicioId: exercicios[3]._id,
          seriesRealizadas: 4,
          cargaUtilizada: 30,
        },
      ],
      concluido: true,
    },
    {
      alunoId: alunos[4]._id,
      treinoId: treinos[4]._id,
      dataHora: new Date('2025-12-19T06:30:00'),
      duracaoReal: 32,
      caloriasQueimadas: 465,
      feedbackAluno: 'HIIT é muito intenso, mas amo o resultado!',
      dificuldadePercebida: 10,
      exerciciosRealizados: [
        {
          exercicioId: exercicios[4]._id,
          seriesRealizadas: 5,
          cargaUtilizada: 0,
          observacoes: 'Burpees são matadores',
        },
      ],
      concluido: true,
    },
    {
      alunoId: alunos[0]._id,
      treinoId: treinos[1]._id,
      dataHora: new Date('2025-12-20T08:30:00'),
      duracaoReal: 70,
      caloriasQueimadas: 395,
      feedbackAluno: 'Treino de costas foi muito bom.',
      dificuldadePercebida: 7,
      exerciciosRealizados: [
        {
          exercicioId: exercicios[2]._id,
          seriesRealizadas: 4,
          cargaUtilizada: 55,
        },
      ],
      concluido: true,
    },
    {
      alunoId: alunos[1]._id,
      treinoId: treinos[0]._id,
      dataHora: new Date('2025-12-21T17:00:00'),
      duracaoReal: 60,
      caloriasQueimadas: 350,
      feedbackAluno: 'Treino tranquilo, consegui aumentar a carga.',
      dificuldadePercebida: 6,
      exerciciosRealizados: [
        {
          exercicioId: exercicios[0]._id,
          seriesRealizadas: 3,
          cargaUtilizada: 45,
          observacoes: 'Aumentei 5kg',
        },
      ],
      concluido: true,
    },
    {
      alunoId: alunos[2]._id,
      treinoId: treinos[3]._id,
      dataHora: new Date('2025-12-22T08:00:00'),
      duracaoReal: 50,
      caloriasQueimadas: 295,
      feedbackAluno: 'Ombros queimaram bastante!',
      dificuldadePercebida: 7,
      exerciciosRealizados: [
        {
          exercicioId: exercicios[3]._id,
          seriesRealizadas: 4,
          cargaUtilizada: 32,
        },
      ],
      concluido: true,
    },
    {
      alunoId: alunos[3]._id,
      treinoId: treinos[2]._id,
      dataHora: new Date('2025-12-23T07:30:00'),
      duracaoReal: 85,
      caloriasQueimadas: 540,
      feedbackAluno: 'Dia de pernas sempre é desafiador.',
      dificuldadePercebida: 9,
      exerciciosRealizados: [
        {
          exercicioId: exercicios[0]._id,
          seriesRealizadas: 5,
          cargaUtilizada: 90,
        },
      ],
      concluido: true,
    },
    {
      alunoId: alunos[4]._id,
      treinoId: treinos[1]._id,
      dataHora: new Date('2025-12-24T18:00:00'),
      duracaoReal: 68,
      caloriasQueimadas: 385,
      feedbackAluno: 'Último treino do ano foi ótimo!',
      dificuldadePercebida: 7,
      exerciciosRealizados: [
        {
          exercicioId: exercicios[2]._id,
          seriesRealizadas: 4,
          cargaUtilizada: 58,
        },
      ],
      concluido: true,
    },
  ];

  try {
    await Execucao.deleteMany({});
    const execucoesInseridas = await Execucao.insertMany(execucoes);
    console.log(`✅ ${execucoesInseridas.length} execuções populadas com sucesso!`);
    return execucoesInseridas;
  } catch (error) {
    console.error('❌ Erro ao popular execuções:', error);
    throw error;
  }
};

module.exports = { populateExecucoes };
