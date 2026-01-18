const Avaliacao = require('./index');
const Aluno = require('../alunos/index');
const Educador = require('../educadores/index');

const populateAvaliacoes = async () => {
  // Buscar alunos e educadores existentes
  const alunos = await Aluno.find().limit(5);
  const educadores = await Educador.find().limit(3);

  if (alunos.length === 0) {
    throw new Error('Nenhum aluno encontrado. Popule os alunos primeiro.');
  }

  if (educadores.length === 0) {
    throw new Error('Nenhum educador encontrado. Popule os educadores primeiro.');
  }

  const avaliacoes = [
    {
      alunoId: alunos[0]._id,
      educadorId: educadores[0]._id,
      nota: 5,
      comentario: 'Excelente profissional! Muito atencioso e competente.',
      dataAvaliacao: new Date('2025-12-15'),
    },
    {
      alunoId: alunos[1]._id,
      educadorId: educadores[0]._id,
      nota: 4,
      comentario: 'Ótimo educador, treinos bem elaborados.',
      dataAvaliacao: new Date('2025-12-20'),
    },
    {
      alunoId: alunos[2]._id,
      educadorId: educadores[1]._id,
      nota: 5,
      comentario: 'Muito profissional, me ajudou a alcançar meus objetivos!',
      dataAvaliacao: new Date('2025-11-25'),
    },
    {
      alunoId: alunos[3]._id,
      educadorId: educadores[1]._id,
      nota: 4,
      comentario: 'Bom acompanhamento, sempre disponível para tirar dúvidas.',
      dataAvaliacao: new Date('2025-12-01'),
    },
    {
      alunoId: alunos[4]._id,
      educadorId: educadores[2]._id,
      nota: 5,
      comentario: 'Excelente! Treinos desafiadores e resultados rápidos.',
      dataAvaliacao: new Date('2025-12-10'),
    },
    {
      alunoId: alunos[0]._id,
      educadorId: educadores[2]._id,
      nota: 4,
      comentario: 'Muito bom, recomendo!',
      dataAvaliacao: new Date('2025-11-30'),
    },
    {
      alunoId: alunos[1]._id,
      educadorId: educadores[1]._id,
      nota: 5,
      comentario: 'Atencioso e dedicado, superou minhas expectativas.',
      dataAvaliacao: new Date('2025-12-05'),
    },
    {
      alunoId: alunos[2]._id,
      educadorId: educadores[0]._id,
      nota: 4,
      comentario: 'Ótimo trabalho, treinos variados e eficientes.',
      dataAvaliacao: new Date('2025-12-12'),
    },
    {
      alunoId: alunos[3]._id,
      educadorId: educadores[2]._id,
      nota: 5,
      comentario: 'Perfeito! Me sinto mais saudável e forte.',
      dataAvaliacao: new Date('2025-12-18'),
    },
    {
      alunoId: alunos[4]._id,
      educadorId: educadores[1]._id,
      nota: 5,
      comentario: 'Profissional exemplar, muito conhecimento técnico.',
      dataAvaliacao: new Date('2025-12-22'),
    },
  ];

  try {
    await Avaliacao.deleteMany({});
    const avaliacoesInseridas = await Avaliacao.insertMany(avaliacoes);
    console.log(`✅ ${avaliacoesInseridas.length} avaliações populadas com sucesso!`);
    return avaliacoesInseridas;
  } catch (error) {
    console.error('❌ Erro ao popular avaliações:', error);
    throw error;
  }
};

module.exports = { populateAvaliacoes };
