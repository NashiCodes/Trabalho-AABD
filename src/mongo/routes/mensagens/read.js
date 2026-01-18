const { Mensagem } = require('@models');

exports.getAll = async (req, res) => {
  try {
    const mensagens = await Mensagem.find()
      .populate('remetenteId', 'nome')
      .populate('destinatarioId', 'nome')
      .sort({ dataHora: -1 });
    res.json(mensagens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const mensagem = await Mensagem.findById(req.params.id)
      .populate('remetenteId')
      .populate('destinatarioId');
    if (!mensagem) {
      return res.status(404).json({ error: 'Mensagem não encontrada' });
    }
    res.json(mensagem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRecebidas = async (req, res) => {
  try {
    const mensagens = await Mensagem.find({ destinatarioId: req.params.destinatarioId })
      .populate('remetenteId', 'nome')
      .sort({ dataHora: -1 });
    res.json(mensagens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEnviadas = async (req, res) => {
  try {
    const mensagens = await Mensagem.find({ remetenteId: req.params.remetenteId })
      .populate('destinatarioId', 'nome')
      .sort({ dataHora: -1 });
    res.json(mensagens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
