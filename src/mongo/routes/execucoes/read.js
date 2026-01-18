const { Execucao } = require('../../models');

exports.getAll = async (req, res) => {
  try {
    const execucoes = await Execucao.find()
      .populate('alunoId', 'nome')
      .populate('treinoId', 'nome objetivo')
      .populate('exerciciosRealizados.exercicioId', 'nome grupoMuscular')
      .sort({ dataHora: -1 });
    res.json(execucoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const execucao = await Execucao.findById(req.params.id)
      .populate('alunoId')
      .populate('treinoId')
      .populate('exerciciosRealizados.exercicioId');
    if (!execucao) {
      return res.status(404).json({ error: 'Execução não encontrada' });
    }
    res.json(execucao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getByAluno = async (req, res) => {
  try {
    const execucoes = await Execucao.find({ alunoId: req.params.alunoId })
      .populate('treinoId', 'nome objetivo')
      .sort({ dataHora: -1 });
    res.json(execucoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getByTreino = async (req, res) => {
  try {
    const execucoes = await Execucao.find({ treinoId: req.params.treinoId })
      .populate('alunoId', 'nome')
      .sort({ dataHora: -1 });
    res.json(execucoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
