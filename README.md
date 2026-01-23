# Trabalho AABD - Sistemas de Gerenciamento de Banco de Dados

![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-47A248?style=flat&logo=mongodb&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/license-ISC-blue)

Projeto desenvolvido para a disciplina de **Aspectos Avançados em Bancos de Dados**, demonstrando a implementação de um sistema de gerenciamento de academias utilizando **MongoDB** (banco de dados NoSQL orientado a documentos).

## Sobre o Projeto

Este projeto implementa um sistema completo de gerenciamento de academia , incluindo:

- Gestão de educadores físicos e alunos
- Criação e acompanhamento de treinos personalizados
- Catálogo de exercícios com detalhes técnicos
- Registro de execuções de treinos com feedback
- Sistema de avaliações e comunicação
- Notificações e lembretes

O sistema foi modelado e implementado utilizando:
- **MongoDB**: Explorando a flexibilidade de documentos e queries complexas com Aggregation Framework

## Estrutura do Projeto

```
Trabalho-AABD/
├── docs/                      # Documentação
│   └── mongo/                 # Documentação MongoDB
│       ├── exemplos-mongo.md  # Exemplos de documentos
│       ├── modelagem-mongo.md # Modelagem detalhada
│       ├── README.md          # Visão geral MongoDB
│       └── relatórioMongo.doc # Relatório completo
│
├── src/                       # Código fonte
│   └── mongo/                 # Implementação MongoDB
│       ├── config/            # Configuração de conexão
│       ├── models/            # Modelos e schemas
│       │   ├── alunos/
│       │   ├── avaliacoes/
│       │   ├── educadores/
│       │   ├── execucoes/
│       │   ├── exercicios/
│       │   ├── mensagens/
│       │   ├── notificacoes/
│       │   └── treinos/
│       ├── populate.js        # Script de população
│       └── queries.js         # Consultas demonstrativas
│
├── tests/                     # Testes automatizados
├── .gitignore                 # Arquivos ignorados pelo Git
├── package.json               # Dependências e scripts
└── README.md                  # Este arquivo
```

## Tecnologias Utilizadas

### Bancos de Dados
- **MongoDB 6.0+**: Banco de dados NoSQL orientado a documentos

### Backend e Ferramentas
- **Node.js 18+**: Ambiente de execução JavaScript
- **Mongoose 9.1+**: ODM para MongoDB
- **dotenv**: Gerenciamento de variáveis de ambiente
- **ESLint**: Linter para JavaScript
- **Prettier**: Formatação de código

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [MongoDB](https://www.mongodb.com/try/download/community) (versão 6.0 ou superior)
- [Git](https://git-scm.com/)

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/NashiCodes/Trabalho-AABD.git
cd Trabalho-AABD
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Crie um arquivo .env na raiz do projeto
cp .env.example .env

# Edite o arquivo .env com suas configurações
```

Exemplo de arquivo `.env`:
```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/mongofit
MONGODB_DB_NAME=mongofit
```

4. Certifique-se de que o MongoDB está rodando:
```bash
# No Linux/Mac
sudo systemctl start mongod

# Ou inicie manualmente
mongod
```

## Uso

### MongoDB

#### Popular o banco de dados e executar consultas
```bash
npm run mongo-queries
```

Este comando irá:
1. Conectar ao MongoDB
2. Popular o banco com dados de exemplo (~300 documentos)
3. Executar 10 consultas demonstrativas
4. Exibir os resultados no console

#### Consultas implementadas
- Busca de alunos por IMC
- Filtros com operadores lógicos
- Agregações com cálculos complexos
- Joins entre collections com `$lookup`
- Análises estatísticas com `$group`
- Pipelines complexos com `$facet`

### Desenvolvimento

```bash
# Executar em modo desenvolvimento
npm run dev

# Verificar formatação do código
npm run format:check

# Formatar código automaticamente
npm run format

# Executar linter
npm run lint

# Corrigir problemas do linter automaticamente
npm run lint:fix
```

## Modelagem de Dados

### MongoDB - Collections

O sistema MongoDB é composto por 8 collections principais:

1. **educadores**: Profissionais de educação física com especialidades
2. **alunos**: Dados pessoais, físicos e histórico de avaliações
3. **exercicios**: Catálogo com 50+ exercícios detalhados
4. **treinos**: Planos de treino com exercícios embarcados
5. **execucoes**: Registro de treinos executados com feedback
6. **avaliacoes**: Avaliações dos educadores pelos alunos
7. **mensagens**: Sistema de comunicação bidirecional
8. **notificacoes**: Alertas e lembretes para usuários

### Estratégias de Design

- **Embedding**: Dados frequentemente acessados juntos (ex: dados pessoais em alunos)
- **Referencing**: Relacionamentos N:N e entidades independentes
- **Índices**: Otimização baseada em padrões de acesso
- **Validações**: Schemas com regras de negócio implementadas

Para mais detalhes, consulte a [documentação completa de modelagem](docs/mongo/modelagem-mongo.md).

## Consultas e Exemplos

### Exemplos de Consultas MongoDB

```javascript
// Buscar alunos com IMC saudável
Aluno.find({
  'dadosFisicos.imc': { $gte: 22, $lte: 26 }
}).select('nome dadosFisicos.imc');

// Calcular média de avaliações por educador
Avaliacao.aggregate([
  { $group: {
    _id: '$educadorId',
    mediaAvaliacoes: { $avg: '$nota' },
    totalAvaliacoes: { $count: {} }
  }},
  { $lookup: {
    from: 'educadores',
    localField: '_id',
    foreignField: '_id',
    as: 'educador'
  }},
  { $unwind: '$educador' },
  { $sort: { mediaAvaliacoes: -1 } }
]);

// Treinos mais eficientes (calorias por minuto)
Treino.aggregate([
  { $match: {
    duracaoEstimada: { $gt: 0 },
    caloriasEstimadas: { $gt: 0 }
  }},
  { $project: {
    nome: 1,
    eficienciaCalórica: {
      $divide: ['$caloriasEstimadas', '$duracaoEstimada']
    }
  }},
  { $sort: { eficienciaCalórica: -1 } },
  { $limit: 5 }
]);
```

Veja mais exemplos em [docs/mongo/exemplos-mongo.md](docs/mongo/exemplos-mongo.md).

## Documentação

### MongoDB
- [Visão Geral](docs/mongo/README.md)
- [Modelagem Detalhada](docs/mongo/modelagem-mongo.md)
- [Exemplos de Documentos](docs/mongo/exemplos-mongo.md)
- [Relatório Completo](docs/mongo/relatórioMongo.doc)

## Características Implementadas

### MongoDB
- [x] Modelagem orientada a documentos
- [x] 8 collections com relacionamentos
- [x] Schemas com validações
- [x] Índices otimizados (simples, compostos e texto)
- [x] Documentos embarcados e referências
- [x] Script de população automatizado
- [x] 10 consultas demonstrativas
- [x] Aggregation Framework
- [x] Joins com `$lookup`
- [x] Operadores complexos (`$group`, `$facet`, `$project`)

## Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run mongo-queries` | Popula o MongoDB e executa consultas demonstrativas |
| `npm run dev` | Executa o projeto em modo desenvolvimento |
| `npm run format` | Formata o código usando Prettier |
| `npm run format:check` | Verifica formatação do código |
| `npm run lint` | Executa o linter ESLint |
| `npm run lint:fix` | Corrige problemas do linter automaticamente |

## Dados de Teste

O script de população gera aproximadamente **300 documentos**:

- 10 educadores com especialidades variadas
- 30 alunos com perfis diversos
- 50+ exercícios de diferentes grupos musculares
- 20+ treinos com objetivos variados
- 40+ avaliações de educadores
- 60+ execuções de treinos registradas
- 50+ mensagens trocadas
- 80+ notificações geradas

## Contribuindo

Este é um projeto acadêmico, mas sugestões e melhorias são bem-vindas:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Autores

- **NashiCodes** - [GitHub](https://github.com/NashiCodes)

## Agradecimentos

- Professor(a) da disciplina de AABD
- Documentação oficial do [MongoDB](https://docs.mongodb.com/)
- Comunidade Node.js
