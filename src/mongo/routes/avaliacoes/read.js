const { Avaliacao } = require('../../models');

exports.getAll = async (req, res) => {
  try {
    const avaliacoes = await Avaliacao.find()
      .populate('alunoId', 'nome')
      .populate('educadorId', 'nome cref')
      .sort({ dataAvaliacao: -1 });
    res.json(avaliacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const avaliacao = await Avaliacao.findById(req.params.id)
      .populate('alunoId')
      .populate('educadorId');
    if (!avaliacao) {
      return res.status(404).json({ error: 'Avaliação não encontrada' });
    }
    res.json(avaliacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getByEducador = async (req, res) => {
  try {
    const avaliacoes = await Avaliacao.find({ educadorId: req.params.educadorId })
      .populate('alunoId', 'nome')
      .sort({ dataAvaliacao: -1 });
    res.json(avaliacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getByAluno = async (req, res) => {
  try {
    const avaliacoes = await Avaliacao.find({ alunoId: req.params.alunoId })
      .populate('educadorId', 'nome cref')
      .sort({ dataAvaliacao: -1 });
    res.json(avaliacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
