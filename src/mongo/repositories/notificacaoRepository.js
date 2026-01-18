const { Notificacao } = require('@models');

const createNotificacao = async (notificacaoData) => {
  const notificacao = new Notificacao(notificacaoData);
  await notificacao.save();
  return notificacao;
};

const updateNotificacao = async (id, notificacaoData) => {
  const notificacao = await Notificacao.findByIdAndUpdate(id, notificacaoData, {
    new: true,
    runValidators: true,
  }).populate('usuarioId', 'nome');
  return notificacao;
};

const getAllNotificacoes = async (options = {}) => {
  const { limit, skip, sort = { dataCriacao: -1 } } = options;
  let query = Notificacao.find().populate('usuarioId', 'nome');

  if (sort) {
    query = query.sort(sort);
  }
  if (skip) {
    query = query.skip(skip);
  }
  if (limit) {
    query = query.limit(limit);
  }

  const notificacoes = await query.exec();
  return notificacoes;
};

const getNotificacaoById = async (id) => {
  const notificacao = await Notificacao.findById(id).populate('usuarioId', 'nome contato');
  return notificacao;
};

const getNotificacoesByUsuario = async (usuarioId, options = {}) => {
  const { limit = 20, skip = 0, lida } = options;
  const query = { usuarioId };

  if (lida !== undefined) {
    query.lida = lida;
  }

  const notificacoes = await Notificacao.find(query)
    .sort({ dataCriacao: -1 })
    .skip(skip)
    .limit(limit);
  return notificacoes;
};

const getNotificacoesByTipo = async (usuarioId, tipo, options = {}) => {
  const { limit = 20, skip = 0 } = options;
  const notificacoes = await Notificacao.find({ usuarioId, tipo })
    .sort({ dataCriacao: -1 })
    .skip(skip)
    .limit(limit);
  return notificacoes;
};

const findNotificacoesByFilters = async (filters) => {
  const query = {};

  if (filters.usuarioId) {
    query.usuarioId = filters.usuarioId;
  }
  if (filters.tipo) {
    query.tipo = filters.tipo;
  }
  if (filters.lida !== undefined) {
    query.lida = filters.lida;
  }
  if (filters.dataInicio || filters.dataFim) {
    query.dataCriacao = {};
    if (filters.dataInicio) {
      query.dataCriacao.$gte = new Date(filters.dataInicio);
    }
    if (filters.dataFim) {
      query.dataCriacao.$lte = new Date(filters.dataFim);
    }
  }

  const notificacoes = await Notificacao.find(query).sort({ dataCriacao: -1 });
  return notificacoes;
};

const marcarComoLida = async (id) => {
  const notificacao = await Notificacao.findByIdAndUpdate(
    id,
    { lida: true, dataLeitura: new Date() },
    { new: true }
  );
  return notificacao;
};

const marcarVariasComoLidas = async (notificacaoIds) => {
  const result = await Notificacao.updateMany(
    { _id: { $in: notificacaoIds } },
    { lida: true, dataLeitura: new Date() }
  );
  return result;
};

const marcarTodasComoLidas = async (usuarioId) => {
  const result = await Notificacao.updateMany(
    { usuarioId, lida: false },
    { lida: true, dataLeitura: new Date() }
  );
  return result;
};

const countNotificacoesNaoLidas = async (usuarioId) => {
  const count = await Notificacao.countDocuments({
    usuarioId,
    lida: false,
  });
  return count;
};

const deleteNotificacao = async (id) => {
  const notificacao = await Notificacao.findByIdAndDelete(id);
  return notificacao;
};

const deleteNotificacoesAntigas = async (diasAtras = 30) => {
  const dataLimite = new Date();
  dataLimite.setDate(dataLimite.getDate() - diasAtras);

  const result = await Notificacao.deleteMany({
    dataCriacao: { $lt: dataLimite },
    lida: true,
  });
  return result;
};

const notificacaoExists = async (id) => {
  const exists = await Notificacao.exists({ _id: id });
  return !!exists;
};

module.exports = {
  createNotificacao,
  updateNotificacao,
  getAllNotificacoes,
  getNotificacaoById,
  getNotificacoesByUsuario,
  getNotificacoesByTipo,
  findNotificacoesByFilters,
  marcarComoLida,
  marcarVariasComoLidas,
  marcarTodasComoLidas,
  countNotificacoesNaoLidas,
  deleteNotificacao,
  deleteNotificacoesAntigas,
  notificacaoExists,
};
