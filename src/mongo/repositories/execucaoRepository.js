const { Execucao } = require('@models');

const createExecucao = async (execucaoData) => {
  const execucao = new Execucao(execucaoData);
  await execucao.save();
  return execucao;
};

const updateExecucao = async (id, execucaoData) => {
  const execucao = await Execucao.findByIdAndUpdate(id, execucaoData, {
    new: true,
    runValidators: true,
  })
    .populate('alunoId', 'nome dadosPessoais.email')
    .populate('treinoId', 'nome nivel objetivo')
    .populate('exerciciosRealizados.exercicioId', 'nome grupoMuscular');
  return execucao;
};

const getAllExecucoes = async (options = {}) => {
  const { limit, skip, sort = { dataHora: -1 } } = options;
  let query = Execucao.find().populate('alunoId', 'nome').populate('treinoId', 'nome nivel');

  if (sort) {
    query = query.sort(sort);
  }
  if (skip) {
    query = query.skip(skip);
  }
  if (limit) {
    query = query.limit(limit);
  }

  const execucoes = await query.exec();
  return execucoes;
};

const getExecucaoById = async (id) => {
  const execucao = await Execucao.findById(id)
    .populate('alunoId', 'nome dadosPessoais dadosFisicos')
    .populate('treinoId', 'nome nivel objetivo exercicios')
    .populate('exerciciosRealizados.exercicioId', 'nome grupoMuscular tipo');
  return execucao;
};

const getExecucoesByAluno = async (alunoId, options = {}) => {
  const { limit = 10, skip = 0 } = options;
  const execucoes = await Execucao.find({ alunoId })
    .populate('treinoId', 'nome nivel objetivo')
    .sort({ dataHora: -1 })
    .skip(skip)
    .limit(limit);
  return execucoes;
};

const getExecucoesByTreino = async (treinoId, options = {}) => {
  const { limit = 10, skip = 0 } = options;
  const execucoes = await Execucao.find({ treinoId })
    .populate('alunoId', 'nome')
    .sort({ dataHora: -1 })
    .skip(skip)
    .limit(limit);
  return execucoes;
};

const findExecucoesByFilters = async (filters) => {
  const query = {};

  if (filters.alunoId) {
    query.alunoId = filters.alunoId;
  }
  if (filters.treinoId) {
    query.treinoId = filters.treinoId;
  }
  if (filters.concluido !== undefined) {
    query.concluido = filters.concluido;
  }
  if (filters.dataInicio || filters.dataFim) {
    query.dataHora = {};
    if (filters.dataInicio) {
      query.dataHora.$gte = new Date(filters.dataInicio);
    }
    if (filters.dataFim) {
      query.dataHora.$lte = new Date(filters.dataFim);
    }
  }

  const execucoes = await Execucao.find(query)
    .populate('alunoId', 'nome')
    .populate('treinoId', 'nome')
    .sort({ dataHora: -1 });
  return execucoes;
};

const countExecucoes = async (filters = {}) => {
  const count = await Execucao.countDocuments(filters);
  return count;
};

const deleteExecucao = async (id) => {
  const execucao = await Execucao.findByIdAndDelete(id);
  return execucao;
};

const execucaoExists = async (id) => {
  const exists = await Execucao.exists({ _id: id });
  return !!exists;
};

const getEstatisticasAluno = async (alunoId) => {
  const execucoes = await Execucao.find({ alunoId, concluido: true });

  const totalTreinos = execucoes.length;
  const totalCalorias = execucoes.reduce((sum, exec) => sum + (exec.caloriasQueimadas || 0), 0);
  const mediaDuracao =
    totalTreinos > 0
      ? execucoes.reduce((sum, exec) => sum + (exec.duracaoReal || 0), 0) / totalTreinos
      : 0;
  const mediaDificuldade =
    totalTreinos > 0
      ? execucoes.reduce((sum, exec) => sum + (exec.dificuldadePercebida || 0), 0) / totalTreinos
      : 0;

  return {
    totalTreinos,
    totalCalorias,
    mediaDuracao: Math.round(mediaDuracao),
    mediaDificuldade: parseFloat(mediaDificuldade.toFixed(1)),
  };
};

module.exports = {
  createExecucao,
  updateExecucao,
  getAllExecucoes,
  getExecucaoById,
  getExecucoesByAluno,
  getExecucoesByTreino,
  findExecucoesByFilters,
  countExecucoes,
  deleteExecucao,
  execucaoExists,
  getEstatisticasAluno,
};
