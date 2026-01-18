const Educador = require('./index');

const populateEducadores = async () => {
  const educadores = [
    {
      nome: 'Roberto Almeida',
      cref: '123456-G/SP',
      especialidades: ['Musculação', 'Hipertrofia', 'Emagrecimento'],
      contato: {
        email: 'roberto.almeida@fitness.com',
        telefone: '(11) 98765-1234',
      },
      alunosAtivos: 15,
      avaliacaoMedia: 4.8,
    },
    {
      nome: 'Carla Mendes',
      cref: '234567-G/RJ',
      especialidades: ['Funcional', 'Condicionamento', 'Idosos'],
      contato: {
        email: 'carla.mendes@fitness.com',
        telefone: '(21) 97654-3210',
      },
      alunosAtivos: 12,
      avaliacaoMedia: 4.9,
    },
    {
      nome: 'Fernando Silva',
      cref: '345678-G/MG',
      especialidades: ['CrossFit', 'Performance Esportiva', 'Força'],
      contato: {
        email: 'fernando.silva@fitness.com',
        telefone: '(31) 96543-2109',
      },
      alunosAtivos: 20,
      avaliacaoMedia: 4.7,
    },
    {
      nome: 'Juliana Santos',
      cref: '456789-G/RS',
      especialidades: ['Pilates', 'Reabilitação', 'Gestantes'],
      contato: {
        email: 'juliana.santos@fitness.com',
        telefone: '(51) 95432-1098',
      },
      alunosAtivos: 8,
      avaliacaoMedia: 5.0,
    },
    {
      nome: 'Marcos Paulo',
      cref: '567890-G/PR',
      especialidades: ['Musculação', 'Definição Muscular', 'Nutrição Esportiva'],
      contato: {
        email: 'marcos.paulo@fitness.com',
        telefone: '(41) 94321-0987',
      },
      alunosAtivos: 18,
      avaliacaoMedia: 4.6,
    },
    {
      nome: 'Patrícia Costa',
      cref: '678901-G/BA',
      especialidades: ['Yoga', 'Flexibilidade', 'Bem-estar'],
      contato: {
        email: 'patricia.costa@fitness.com',
        telefone: '(71) 93210-9876',
      },
      alunosAtivos: 10,
      avaliacaoMedia: 4.9,
    },
    {
      nome: 'Ricardo Oliveira',
      cref: '789012-G/DF',
      especialidades: ['Corrida', 'Treinamento Funcional', 'Cardio'],
      contato: {
        email: 'ricardo.oliveira@fitness.com',
        telefone: '(61) 92109-8765',
      },
      alunosAtivos: 14,
      avaliacaoMedia: 4.5,
    },
    {
      nome: 'Amanda Rodrigues',
      cref: '890123-G/PE',
      especialidades: ['Musculação Feminina', 'Emagrecimento', 'Body Pump'],
      contato: {
        email: 'amanda.rodrigues@fitness.com',
        telefone: '(81) 91098-7654',
      },
      alunosAtivos: 16,
      avaliacaoMedia: 4.8,
    },
    {
      nome: 'Gabriel Lima',
      cref: '901234-G/CE',
      especialidades: ['HIIT', 'Condicionamento', 'Atletas'],
      contato: {
        email: 'gabriel.lima@fitness.com',
        telefone: '(85) 90987-6543',
      },
      alunosAtivos: 22,
      avaliacaoMedia: 4.7,
    },
    {
      nome: 'Luciana Ferreira',
      cref: '012345-G/SC',
      especialidades: ['Alongamento', 'Postura', 'Terceira Idade'],
      contato: {
        email: 'luciana.ferreira@fitness.com',
        telefone: '(47) 99876-5432',
      },
      alunosAtivos: 9,
      avaliacaoMedia: 5.0,
    },
  ];

  try {
    await Educador.deleteMany({});
    const educadoresInseridos = await Educador.insertMany(educadores);
    console.log(`✅ ${educadoresInseridos.length} educadores populados com sucesso!`);
    return educadoresInseridos;
  } catch (error) {
    console.error('❌ Erro ao popular educadores:', error);
    throw error;
  }
};

module.exports = { populateEducadores };
