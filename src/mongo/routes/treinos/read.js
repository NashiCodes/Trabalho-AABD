const { Treino } = require('@models');

exports.getAll = async (req, res) => {
  try {
    const treinos = await Treino.find()
      .populate('criadoPor', 'nome cref')
      .populate('exercicios.exercicioId', 'nome grupoMuscular');
    res.json(treinos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const treino = await Treino.findById(req.params.id)
      .populate('criadoPor', 'nome cref especialidades')
      .populate('exercicios.exercicioId');
    if (!treino) {
      return res.status(404).json({ error: 'Treino não encontrado' });
    }
    res.json(treino);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getByEducador = async (req, res) => {
  try {
    const treinos = await Treino.find({ criadoPor: req.params.educadorId }).populate(
      'exercicios.exercicioId',
      'nome grupoMuscular'
    );
    res.json(treinos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
