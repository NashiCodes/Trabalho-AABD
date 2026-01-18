const { Notificacao } = require('@models');

exports.getAll = async (req, res) => {
  try {
    const notificacoes = await Notificacao.find()
      .populate('usuarioId', 'nome')
      .sort({ dataCriacao: -1 });
    res.json(notificacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const notificacao = await Notificacao.findById(req.params.id).populate('usuarioId');
    if (!notificacao) {
      return res.status(404).json({ error: 'Notificação não encontrada' });
    }
    res.json(notificacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getByUsuario = async (req, res) => {
  try {
    const notificacoes = await Notificacao.find({ usuarioId: req.params.usuarioId }).sort({
      dataCriacao: -1,
    });
    res.json(notificacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNaoLidas = async (req, res) => {
  try {
    const notificacoes = await Notificacao.find({
      usuarioId: req.params.usuarioId,
      lida: false,
    }).sort({ dataCriacao: -1 });
    res.json(notificacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
