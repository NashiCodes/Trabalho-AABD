const { populateAlunos } = require('./models/alunos/populate');
const { populateEducadores } = require('./models/educadores/populate');
const { populateExercicios } = require('./models/exercicios/populate');
const { populateTreinos } = require('./models/treinos/populate');
const { populateAvaliacoes } = require('./models/avaliacoes/populate');
const { populateExecucoes } = require('./models/execucoes/populate');
const { populateMensagens } = require('./models/mensagens/populate');
const { populateNotificacoes } = require('./models/notificacoes/populate');

const populateDB = async () => {
  console.log('🚀 Iniciando população do banco de dados...\n');

  // Popula entidades base (sem dependências)
  await populateEducadores();
  await populateAlunos();
  await populateExercicios();

  // Popula entidades que dependem das anteriores
  await populateTreinos();
  await populateAvaliacoes();
  await populateExecucoes();
  await populateMensagens();
  await populateNotificacoes();

  console.log('\n✨ Banco de dados populado com sucesso!');
};

module.exports = { populateDB };
