const Notificacao = require('./index');
const Aluno = require('../alunos/index');
const Educador = require('../educadores/index');

const populateNotificacoes = async () => {
  // Buscar alunos e educadores existentes
  const alunos = await Aluno.find().limit(5);
  const educadores = await Educador.find().limit(3);

  if (alunos.length === 0) {
    throw new Error('Nenhum aluno encontrado. Popule os alunos primeiro.');
  }

  if (educadores.length === 0) {
    throw new Error('Nenhum educador encontrado. Popule os educadores primeiro.');
  }

  const notificacoes = [
    {
      usuarioId: alunos[0]._id,
      usuarioTipo: 'Aluno',
      tipo: 'lembrete_treino',
      titulo: 'Hora do treino!',
      mensagem: 'Não se esqueça do seu treino de hoje às 18h.',
      lida: true,
      dataCriacao: new Date('2025-12-15T17:00:00'),
      dataLeitura: new Date('2025-12-15T17:30:00'),
      link: '/treinos/123',
    },
    {
      usuarioId: alunos[1]._id,
      usuarioTipo: 'Aluno',
      tipo: 'nova_mensagem',
      titulo: 'Nova mensagem',
      mensagem: 'Você recebeu uma nova mensagem do seu educador.',
      lida: true,
      dataCriacao: new Date('2025-12-16T11:15:00'),
      dataLeitura: new Date('2025-12-16T12:00:00'),
      link: '/mensagens/456',
    },
    {
      usuarioId: educadores[0]._id,
      usuarioTipo: 'Educador',
      tipo: 'avaliacao_pendente',
      titulo: 'Nova avaliação recebida',
      mensagem: 'João Silva avaliou seu trabalho com 5 estrelas.',
      lida: true,
      dataCriacao: new Date('2025-12-15T20:00:00'),
      dataLeitura: new Date('2025-12-15T20:15:00'),
      link: '/avaliacoes',
    },
    {
      usuarioId: alunos[2]._id,
      usuarioTipo: 'Aluno',
      tipo: 'meta_atingida',
      titulo: 'Parabéns! Meta atingida',
      mensagem: 'Você completou 10 treinos este mês!',
      lida: true,
      dataCriacao: new Date('2025-12-17T22:00:00'),
      dataLeitura: new Date('2025-12-18T08:00:00'),
      link: '/progresso',
    },
    {
      usuarioId: alunos[3]._id,
      usuarioTipo: 'Aluno',
      tipo: 'lembrete_treino',
      titulo: 'Treino de hoje',
      mensagem: 'Seu treino de ombros está agendado para às 19h.',
      lida: false,
      dataCriacao: new Date('2025-12-18T18:00:00'),
      link: '/treinos/789',
    },
    {
      usuarioId: educadores[1]._id,
      usuarioTipo: 'Educador',
      tipo: 'nova_mensagem',
      titulo: 'Mensagem do aluno',
      mensagem: 'Carlos Eduardo enviou uma mensagem sobre dor no ombro.',
      lida: true,
      dataCriacao: new Date('2025-12-18T15:00:00'),
      dataLeitura: new Date('2025-12-18T15:20:00'),
      link: '/mensagens/789',
    },
    {
      usuarioId: alunos[4]._id,
      usuarioTipo: 'Aluno',
      tipo: 'meta_atingida',
      titulo: 'Objetivo alcançado!',
      mensagem: 'Você perdeu 3kg desde o início do programa!',
      lida: true,
      dataCriacao: new Date('2025-12-19T08:00:00'),
      dataLeitura: new Date('2025-12-19T09:00:00'),
      link: '/progresso',
    },
    {
      usuarioId: educadores[2]._id,
      usuarioTipo: 'Educador',
      tipo: 'avaliacao_pendente',
      titulo: 'Nova avaliação',
      mensagem: 'Pedro Henrique avaliou seu atendimento.',
      lida: false,
      dataCriacao: new Date('2025-12-19T19:00:00'),
      link: '/avaliacoes',
    },
    {
      usuarioId: alunos[0]._id,
      usuarioTipo: 'Aluno',
      tipo: 'outro',
      titulo: 'Atualização do app',
      mensagem: 'Nova versão disponível com melhorias no histórico de treinos.',
      lida: false,
      dataCriacao: new Date('2025-12-20T10:00:00'),
    },
    {
      usuarioId: alunos[1]._id,
      usuarioTipo: 'Aluno',
      tipo: 'lembrete_treino',
      titulo: 'Não perca seu treino!',
      mensagem: 'Seu próximo treino está agendado para amanhã às 7h.',
      lida: false,
      dataCriacao: new Date('2025-12-20T18:00:00'),
      link: '/treinos/321',
    },
  ];

  try {
    await Notificacao.deleteMany({});
    const notificacoesInseridas = await Notificacao.insertMany(notificacoes);
    console.log(`✅ ${notificacoesInseridas.length} notificações populadas com sucesso!`);
    return notificacoesInseridas;
  } catch (error) {
    console.error('❌ Erro ao popular notificações:', error);
    throw error;
  }
};

module.exports = { populateNotificacoes };
