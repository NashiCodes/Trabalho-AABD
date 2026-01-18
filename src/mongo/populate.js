const { populateAlunos } = require('@mongo/models/alunos/populate');
const { populateEducadores } = require('@mongo/models/educadores/populate');
const { populateExercicios } = require('@mongo/models/exercicios/populate');
const { populateTreinos } = require('@mongo/models/treinos/populate');
const { populateAvaliacoes } = require('@mongo/models/avaliacoes/populate');
const { populateExecucoes } = require('@mongo/models/execucoes/populate');
const { populateMensagens } = require('@mongo/models/mensagens/populate');
const { populateNotificacoes } = require('@mongo/models/notificacoes/populate');

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
