const Mensagem = require('./index');
const Aluno = require('../alunos/index');
const Educador = require('../educadores/index');

const populateMensagens = async () => {
  // Buscar alunos e educadores existentes
  const alunos = await Aluno.find().limit(5);
  const educadores = await Educador.find().limit(3);

  if (alunos.length === 0) {
    throw new Error('Nenhum aluno encontrado. Popule os alunos primeiro.');
  }

  if (educadores.length === 0) {
    throw new Error('Nenhum educador encontrado. Popule os educadores primeiro.');
  }

  const mensagens = [
    {
      remetenteId: alunos[0]._id,
      remetenteTipo: 'Aluno',
      destinatarioId: educadores[0]._id,
      destinatarioTipo: 'Educador',
      assunto: 'Dúvida sobre treino',
      conteudo: 'Olá! Gostaria de saber se posso aumentar a carga no supino.',
      dataHora: new Date('2025-12-15T10:30:00'),
      lida: true,
      dataLeitura: new Date('2025-12-15T11:00:00'),
    },
    {
      remetenteId: educadores[0]._id,
      remetenteTipo: 'Educador',
      destinatarioId: alunos[0]._id,
      destinatarioTipo: 'Aluno',
      assunto: 'Re: Dúvida sobre treino',
      conteudo: 'Sim, pode aumentar em 5kg. Mantenha a boa forma!',
      dataHora: new Date('2025-12-15T11:15:00'),
      lida: true,
      dataLeitura: new Date('2025-12-15T12:00:00'),
    },
    {
      remetenteId: alunos[1]._id,
      remetenteTipo: 'Aluno',
      destinatarioId: educadores[0]._id,
      destinatarioTipo: 'Educador',
      assunto: 'Alteração de horário',
      conteudo: 'Preciso remarcar nosso treino de amanhã. Poderia ser às 19h?',
      dataHora: new Date('2025-12-16T14:00:00'),
      lida: true,
      dataLeitura: new Date('2025-12-16T14:30:00'),
    },
    {
      remetenteId: educadores[1]._id,
      remetenteTipo: 'Educador',
      destinatarioId: alunos[2]._id,
      destinatarioTipo: 'Aluno',
      assunto: 'Novo treino disponível',
      conteudo: 'Preparei um novo treino de pernas para você. Confira no app!',
      dataHora: new Date('2025-12-17T09:00:00'),
      lida: true,
      dataLeitura: new Date('2025-12-17T09:30:00'),
    },
    {
      remetenteId: alunos[2]._id,
      remetenteTipo: 'Aluno',
      destinatarioId: educadores[1]._id,
      destinatarioTipo: 'Educador',
      assunto: 'Re: Novo treino disponível',
      conteudo: 'Obrigado! Vou fazer hoje mesmo.',
      dataHora: new Date('2025-12-17T10:00:00'),
      lida: true,
      dataLeitura: new Date('2025-12-17T10:15:00'),
    },
    {
      remetenteId: alunos[3]._id,
      remetenteTipo: 'Aluno',
      destinatarioId: educadores[1]._id,
      destinatarioTipo: 'Educador',
      assunto: 'Dor no ombro',
      conteudo: 'Estou sentindo uma leve dor no ombro direito. Devo continuar?',
      dataHora: new Date('2025-12-18T15:00:00'),
      lida: true,
      dataLeitura: new Date('2025-12-18T15:20:00'),
    },
    {
      remetenteId: educadores[1]._id,
      remetenteTipo: 'Educador',
      destinatarioId: alunos[3]._id,
      destinatarioTipo: 'Aluno',
      assunto: 'Re: Dor no ombro',
      conteudo: 'Vamos pausar os exercícios de ombro por alguns dias. Faça gelo.',
      dataHora: new Date('2025-12-18T15:30:00'),
      lida: false,
    },
    {
      remetenteId: alunos[4]._id,
      remetenteTipo: 'Aluno',
      destinatarioId: educadores[2]._id,
      destinatarioTipo: 'Educador',
      assunto: 'Resultado dos treinos',
      conteudo: 'Já perdi 3kg desde que começamos! Muito obrigado pelo acompanhamento.',
      dataHora: new Date('2025-12-19T16:00:00'),
      lida: true,
      dataLeitura: new Date('2025-12-19T16:30:00'),
    },
    {
      remetenteId: educadores[2]._id,
      remetenteTipo: 'Educador',
      destinatarioId: alunos[4]._id,
      destinatarioTipo: 'Aluno',
      assunto: 'Re: Resultado dos treinos',
      conteudo: 'Parabéns! Continue assim, estamos no caminho certo.',
      dataHora: new Date('2025-12-19T17:00:00'),
      lida: true,
      dataLeitura: new Date('2025-12-19T18:00:00'),
    },
    {
      remetenteId: alunos[0]._id,
      remetenteTipo: 'Aluno',
      destinatarioId: educadores[2]._id,
      destinatarioTipo: 'Educador',
      assunto: 'Avaliação física',
      conteudo: 'Quando podemos agendar minha próxima avaliação física?',
      dataHora: new Date('2025-12-20T11:00:00'),
      lida: false,
    },
  ];

  try {
    await Mensagem.deleteMany({});
    const mensagensInseridas = await Mensagem.insertMany(mensagens);
    console.log(`✅ ${mensagensInseridas.length} mensagens populadas com sucesso!`);
    return mensagensInseridas;
  } catch (error) {
    console.error('❌ Erro ao popular mensagens:', error);
    throw error;
  }
};

module.exports = { populateMensagens };
