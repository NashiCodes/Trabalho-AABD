const Exercicio = require('./index');

const populateExercicios = async () => {
  const exercicios = [
    {
      nome: 'Supino Reto',
      grupoMuscular: ['Peitoral', 'Tríceps', 'Ombros'],
      tipo: 'Anaeróbico',
      equipamento: ['Barra', 'Banco'],
      descricaoTecnica: 'Deitar no banco, descer a barra até o peito e empurrar para cima.',
      nivelDificuldade: 'Intermediário',
      videoUrl: 'https://youtube.com/supino-reto',
      calorias100kg: 250,
    },
    {
      nome: 'Agachamento Livre',
      grupoMuscular: ['Quadríceps', 'Glúteos', 'Posterior'],
      tipo: 'Anaeróbico',
      equipamento: ['Barra'],
      descricaoTecnica: 'Abaixar o corpo flexionando joelhos e quadril, mantendo coluna reta.',
      nivelDificuldade: 'Avançado',
      videoUrl: 'https://youtube.com/agachamento',
      calorias100kg: 300,
    },
    {
      nome: 'Levantamento Terra',
      grupoMuscular: ['Posterior', 'Lombar', 'Trapézio'],
      tipo: 'Anaeróbico',
      equipamento: ['Barra'],
      descricaoTecnica: 'Levantar a barra do chão mantendo a coluna neutra.',
      nivelDificuldade: 'Avançado',
      videoUrl: 'https://youtube.com/levantamento-terra',
      calorias100kg: 320,
    },
    {
      nome: 'Rosca Direta',
      grupoMuscular: ['Bíceps'],
      tipo: 'Anaeróbico',
      equipamento: ['Barra'],
      descricaoTecnica: 'Flexionar os cotovelos elevando a barra até os ombros.',
      nivelDificuldade: 'Iniciante',
      videoUrl: 'https://youtube.com/rosca-direta',
      calorias100kg: 150,
    },
    {
      nome: 'Desenvolvimento Militar',
      grupoMuscular: ['Ombros', 'Tríceps'],
      tipo: 'Anaeróbico',
      equipamento: ['Barra'],
      descricaoTecnica: 'Empurrar a barra acima da cabeça partindo dos ombros.',
      nivelDificuldade: 'Intermediário',
      videoUrl: 'https://youtube.com/desenvolvimento',
      calorias100kg: 220,
    },
    {
      nome: 'Corrida',
      grupoMuscular: ['Pernas', 'Cardiovascular'],
      tipo: 'Aeróbico',
      equipamento: ['Esteira'],
      descricaoTecnica: 'Correr em velocidade constante ou intervalada.',
      nivelDificuldade: 'Iniciante',
      videoUrl: 'https://youtube.com/corrida',
      calorias100kg: 600,
    },
    {
      nome: 'Remada Curvada',
      grupoMuscular: ['Dorsais', 'Bíceps', 'Trapézio'],
      tipo: 'Anaeróbico',
      equipamento: ['Barra'],
      descricaoTecnica: 'Puxar a barra em direção ao abdômen com corpo inclinado.',
      nivelDificuldade: 'Intermediário',
      videoUrl: 'https://youtube.com/remada-curvada',
      calorias100kg: 240,
    },
    {
      nome: 'Abdominal Supra',
      grupoMuscular: ['Abdômen'],
      tipo: 'Anaeróbico',
      equipamento: ['Colchonete'],
      descricaoTecnica: 'Elevar o tronco em direção aos joelhos.',
      nivelDificuldade: 'Iniciante',
      videoUrl: 'https://youtube.com/abdominal',
      calorias100kg: 100,
    },
    {
      nome: 'Burpee',
      grupoMuscular: ['Corpo todo'],
      tipo: 'Misto',
      equipamento: [],
      descricaoTecnica: 'Agachar, apoiar mãos, estender pernas, fazer flexão, voltar e saltar.',
      nivelDificuldade: 'Avançado',
      videoUrl: 'https://youtube.com/burpee',
      calorias100kg: 500,
    },
    {
      nome: 'Prancha Isométrica',
      grupoMuscular: ['Core', 'Abdômen'],
      tipo: 'Anaeróbico',
      equipamento: ['Colchonete'],
      descricaoTecnica: 'Manter corpo reto apoiado em antebraços e pés.',
      nivelDificuldade: 'Iniciante',
      videoUrl: 'https://youtube.com/prancha',
      calorias100kg: 120,
    },
  ];

  try {
    await Exercicio.deleteMany({});
    const exerciciosInseridos = await Exercicio.insertMany(exercicios);
    console.log(`✅ ${exerciciosInseridos.length} exercícios populados com sucesso!`);
    return exerciciosInseridos;
  } catch (error) {
    console.error('❌ Erro ao popular exercícios:', error);
    throw error;
  }
};

module.exports = { populateExercicios };
