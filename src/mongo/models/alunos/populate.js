const Aluno = require('./index');

const populateAlunos = async () => {
  const alunos = [
    {
      nome: 'João Silva',
      dadosPessoais: {
        email: 'joao.silva@email.com',
        telefone: '(11) 98765-4321',
        dataNascimento: new Date('1995-03-15'),
        genero: 'M',
      },
      dadosFisicos: {
        peso: 78.5,
        altura: 1.75,
        imc: 25.6,
      },
      objetivos: ['Ganho de massa muscular', 'Hipertrofia'],
      nivel: 'Intermediário',
      restricoesMedicas: [],
      historicoAvaliacoes: [
        {
          data: new Date('2025-12-01'),
          peso: 80.0,
          percentualGordura: 18.5,
          massaMuscular: 65.2,
          circunferencias: {
            braco: 35.5,
            perna: 55.0,
            cintura: 85.0,
          },
        },
      ],
    },
    {
      nome: 'Maria Oliveira',
      dadosPessoais: {
        email: 'maria.oliveira@email.com',
        telefone: '(21) 91234-5678',
        dataNascimento: new Date('1990-07-22'),
        genero: 'F',
      },
      dadosFisicos: {
        peso: 62.0,
        altura: 1.65,
        imc: 22.8,
      },
      objetivos: ['Emagrecimento', 'Condicionamento físico'],
      nivel: 'Iniciante',
      restricoesMedicas: ['Problemas na coluna'],
    },
    {
      nome: 'Carlos Eduardo',
      dadosPessoais: {
        email: 'carlos.eduardo@email.com',
        telefone: '(31) 99876-5432',
        dataNascimento: new Date('1988-11-10'),
        genero: 'M',
      },
      dadosFisicos: {
        peso: 92.5,
        altura: 1.82,
        imc: 27.9,
      },
      objetivos: ['Emagrecimento', 'Definição muscular'],
      nivel: 'Avançado',
      restricoesMedicas: ['Hipertensão'],
      historicoAvaliacoes: [
        {
          data: new Date('2025-11-15'),
          peso: 95.0,
          percentualGordura: 22.0,
          massaMuscular: 74.1,
          circunferencias: {
            braco: 38.0,
            perna: 60.0,
            cintura: 92.0,
          },
        },
      ],
    },
    {
      nome: 'Ana Paula Santos',
      dadosPessoais: {
        email: 'ana.paula@email.com',
        telefone: '(41) 98888-7777',
        dataNascimento: new Date('1998-05-30'),
        genero: 'F',
      },
      dadosFisicos: {
        peso: 55.0,
        altura: 1.6,
        imc: 21.5,
      },
      objetivos: ['Ganho de massa muscular', 'Saúde geral'],
      nivel: 'Iniciante',
      restricoesMedicas: [],
    },
    {
      nome: 'Pedro Henrique',
      dadosPessoais: {
        email: 'pedro.henrique@email.com',
        telefone: '(51) 97777-6666',
        dataNascimento: new Date('1992-09-18'),
        genero: 'M',
      },
      dadosFisicos: {
        peso: 85.0,
        altura: 1.78,
        imc: 26.8,
      },
      objetivos: ['Hipertrofia', 'Força'],
      nivel: 'Avançado',
      restricoesMedicas: [],
      historicoAvaliacoes: [
        {
          data: new Date('2025-12-10'),
          peso: 85.0,
          percentualGordura: 15.0,
          massaMuscular: 72.3,
          circunferencias: {
            braco: 40.0,
            perna: 62.0,
            cintura: 82.0,
          },
        },
      ],
    },
    {
      nome: 'Juliana Costa',
      dadosPessoais: {
        email: 'juliana.costa@email.com',
        telefone: '(61) 96666-5555',
        dataNascimento: new Date('1996-02-14'),
        genero: 'F',
      },
      dadosFisicos: {
        peso: 68.0,
        altura: 1.7,
        imc: 23.5,
      },
      objetivos: ['Definição muscular', 'Condicionamento'],
      nivel: 'Intermediário',
      restricoesMedicas: [],
    },
    {
      nome: 'Rafael Almeida',
      dadosPessoais: {
        email: 'rafael.almeida@email.com',
        telefone: '(71) 95555-4444',
        dataNascimento: new Date('1994-12-05'),
        genero: 'M',
      },
      dadosFisicos: {
        peso: 73.0,
        altura: 1.73,
        imc: 24.4,
      },
      objetivos: ['Saúde geral', 'Emagrecimento'],
      nivel: 'Iniciante',
      restricoesMedicas: ['Diabetes tipo 2'],
    },
    {
      nome: 'Fernanda Lima',
      dadosPessoais: {
        email: 'fernanda.lima@email.com',
        telefone: '(81) 94444-3333',
        dataNascimento: new Date('1991-08-28'),
        genero: 'F',
      },
      dadosFisicos: {
        peso: 58.5,
        altura: 1.62,
        imc: 22.3,
      },
      objetivos: ['Tonificação', 'Flexibilidade'],
      nivel: 'Intermediário',
      restricoesMedicas: [],
      historicoAvaliacoes: [
        {
          data: new Date('2025-11-20'),
          peso: 59.0,
          percentualGordura: 24.0,
          massaMuscular: 44.8,
          circunferencias: {
            braco: 26.5,
            perna: 50.0,
            cintura: 68.0,
          },
        },
      ],
    },
    {
      nome: 'Lucas Rodrigues',
      dadosPessoais: {
        email: 'lucas.rodrigues@email.com',
        telefone: '(85) 93333-2222',
        dataNascimento: new Date('1997-04-12'),
        genero: 'M',
      },
      dadosFisicos: {
        peso: 70.0,
        altura: 1.76,
        imc: 22.6,
      },
      objetivos: ['Ganho de massa muscular', 'Performance esportiva'],
      nivel: 'Intermediário',
      restricoesMedicas: [],
    },
    {
      nome: 'Camila Ferreira',
      dadosPessoais: {
        email: 'camila.ferreira@email.com',
        telefone: '(47) 92222-1111',
        dataNascimento: new Date('1993-10-20'),
        genero: 'F',
      },
      dadosFisicos: {
        peso: 65.0,
        altura: 1.68,
        imc: 23.0,
      },
      objetivos: ['Condicionamento físico', 'Saúde geral'],
      nivel: 'Iniciante',
      restricoesMedicas: ['Asma'],
    },
  ];

  try {
    await Aluno.deleteMany({});
    const alunosInseridos = await Aluno.insertMany(alunos);
    console.log(`✅ ${alunosInseridos.length} alunos populados com sucesso!`);
    return alunosInseridos;
  } catch (error) {
    console.error('❌ Erro ao popular alunos:', error);
    throw error;
  }
};

module.exports = { populateAlunos };
