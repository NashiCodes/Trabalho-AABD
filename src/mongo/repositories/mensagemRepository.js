const { Mensagem } = require('@models');

const createMensagem = async (mensagemData) => {
  const mensagem = new Mensagem(mensagemData);
  await mensagem.save();
  return mensagem;
};

const updateMensagem = async (id, mensagemData) => {
  const mensagem = await Mensagem.findByIdAndUpdate(id, mensagemData, {
    new: true,
    runValidators: true,
  })
    .populate('remetenteId', 'nome')
    .populate('destinatarioId', 'nome');
  return mensagem;
};

const getAllMensagens = async (options = {}) => {
  const { limit, skip, sort = { dataHora: -1 } } = options;
  let query = Mensagem.find().populate('remetenteId', 'nome').populate('destinatarioId', 'nome');

  if (sort) {
    query = query.sort(sort);
  }
  if (skip) {
    query = query.skip(skip);
  }
  if (limit) {
    query = query.limit(limit);
  }

  const mensagens = await query.exec();
  return mensagens;
};

const getMensagemById = async (id) => {
  const mensagem = await Mensagem.findById(id)
    .populate('remetenteId', 'nome contato')
    .populate('destinatarioId', 'nome contato');
  return mensagem;
};

const getMensagensByUsuario = async (usuarioId, options = {}) => {
  const { limit = 20, skip = 0 } = options;
  const mensagens = await Mensagem.find({
    $or: [{ remetenteId: usuarioId }, { destinatarioId: usuarioId }],
  })
    .populate('remetenteId', 'nome')
    .populate('destinatarioId', 'nome')
    .sort({ dataHora: -1 })
    .skip(skip)
    .limit(limit);
  return mensagens;
};

const getMensagensRecebidas = async (usuarioId, options = {}) => {
  const { limit = 20, skip = 0, lida } = options;
  const query = { destinatarioId: usuarioId };

  if (lida !== undefined) {
    query.lida = lida;
  }

  const mensagens = await Mensagem.find(query)
    .populate('remetenteId', 'nome')
    .sort({ dataHora: -1 })
    .skip(skip)
    .limit(limit);
  return mensagens;
};

const getMensagensEnviadas = async (usuarioId, options = {}) => {
  const { limit = 20, skip = 0 } = options;
  const mensagens = await Mensagem.find({ remetenteId: usuarioId })
    .populate('destinatarioId', 'nome')
    .sort({ dataHora: -1 })
    .skip(skip)
    .limit(limit);
  return mensagens;
};

const marcarComoLida = async (id) => {
  const mensagem = await Mensagem.findByIdAndUpdate(
    id,
    { lida: true, dataLeitura: new Date() },
    { new: true }
  );
  return mensagem;
};

const marcarVariasComoLidas = async (mensagemIds) => {
  const result = await Mensagem.updateMany(
    { _id: { $in: mensagemIds } },
    { lida: true, dataLeitura: new Date() }
  );
  return result;
};

const countMensagensNaoLidas = async (usuarioId) => {
  const count = await Mensagem.countDocuments({
    destinatarioId: usuarioId,
    lida: false,
  });
  return count;
};

const deleteMensagem = async (id) => {
  const mensagem = await Mensagem.findByIdAndDelete(id);
  return mensagem;
};

const mensagemExists = async (id) => {
  const exists = await Mensagem.exists({ _id: id });
  return !!exists;
};

module.exports = {
  createMensagem,
  updateMensagem,
  getAllMensagens,
  getMensagemById,
  getMensagensByUsuario,
  getMensagensRecebidas,
  getMensagensEnviadas,
  marcarComoLida,
  marcarVariasComoLidas,
  countMensagensNaoLidas,
  deleteMensagem,
  mensagemExists,
};
