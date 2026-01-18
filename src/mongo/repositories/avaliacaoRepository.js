const { Avaliacao } = require('@models');

const createAvaliacao = async (avaliacaoData) => {
  const avaliacao = new Avaliacao(avaliacaoData);
  await avaliacao.save();
  return avaliacao;
};

const updateAvaliacao = async (id, avaliacaoData) => {
  const avaliacao = await Avaliacao.findByIdAndUpdate(id, avaliacaoData, {
    new: true,
    runValidators: true,
  })
    .populate('alunoId', 'nome dadosPessoais.email')
    .populate('educadorId', 'nome cref');
  return avaliacao;
};

const getAllAvaliacoes = async (options = {}) => {
  const { limit, skip, sort = { dataAvaliacao: -1 } } = options;
  let query = Avaliacao.find().populate('alunoId', 'nome').populate('educadorId', 'nome cref');

  if (sort) {
    query = query.sort(sort);
  }
  if (skip) {
    query = query.skip(skip);
  }
  if (limit) {
    query = query.limit(limit);
  }

  const avaliacoes = await query.exec();
  return avaliacoes;
};

const getAvaliacaoById = async (id) => {
  const avaliacao = await Avaliacao.findById(id)
    .populate('alunoId', 'nome dadosPessoais')
    .populate('educadorId', 'nome cref especialidades');
  return avaliacao;
};

const getAvaliacoesByEducador = async (educadorId, options = {}) => {
  const { limit = 10, skip = 0 } = options;
  const avaliacoes = await Avaliacao.find({ educadorId })
    .populate('alunoId', 'nome')
    .sort({ dataAvaliacao: -1 })
    .skip(skip)
    .limit(limit);
  return avaliacoes;
};

const getAvaliacoesByAluno = async (alunoId, options = {}) => {
  const { limit = 10, skip = 0 } = options;
  const avaliacoes = await Avaliacao.find({ alunoId })
    .populate('educadorId', 'nome cref')
    .sort({ dataAvaliacao: -1 })
    .skip(skip)
    .limit(limit);
  return avaliacoes;
};

const findAvaliacoesByFilters = async (filters) => {
  const query = {};

  if (filters.educadorId) {
    query.educadorId = filters.educadorId;
  }
  if (filters.alunoId) {
    query.alunoId = filters.alunoId;
  }
  if (filters.notaMinima || filters.notaMaxima) {
    query.nota = {};
    if (filters.notaMinima) {
      query.nota.$gte = filters.notaMinima;
    }
    if (filters.notaMaxima) {
      query.nota.$lte = filters.notaMaxima;
    }
  }
  if (filters.dataInicio || filters.dataFim) {
    query.dataAvaliacao = {};
    if (filters.dataInicio) {
      query.dataAvaliacao.$gte = new Date(filters.dataInicio);
    }
    if (filters.dataFim) {
      query.dataAvaliacao.$lte = new Date(filters.dataFim);
    }
  }

  const avaliacoes = await Avaliacao.find(query)
    .populate('alunoId', 'nome')
    .populate('educadorId', 'nome cref')
    .sort({ dataAvaliacao: -1 });
  return avaliacoes;
};

const getMediaAvaliacoesEducador = async (educadorId) => {
  const avaliacoes = await Avaliacao.find({ educadorId });

  if (avaliacoes.length === 0) {
    return 0;
  }

  const soma = avaliacoes.reduce((acc, av) => acc + av.nota, 0);
  const media = soma / avaliacoes.length;
  return parseFloat(media.toFixed(2));
};

const countAvaliacoes = async (filters = {}) => {
  const count = await Avaliacao.countDocuments(filters);
  return count;
};

const deleteAvaliacao = async (id) => {
  const avaliacao = await Avaliacao.findByIdAndDelete(id);
  return avaliacao;
};

const avaliacaoExists = async (id) => {
  const exists = await Avaliacao.exists({ _id: id });
  return !!exists;
};

module.exports = {
  createAvaliacao,
  updateAvaliacao,
  getAllAvaliacoes,
  getAvaliacaoById,
  getAvaliacoesByEducador,
  getAvaliacoesByAluno,
  findAvaliacoesByFilters,
  getMediaAvaliacoesEducador,
  countAvaliacoes,
  deleteAvaliacao,
  avaliacaoExists,
};
