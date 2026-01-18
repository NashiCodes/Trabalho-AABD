const { Exercicio } = require('@models');

exports.getAll = async (req, res) => {
  try {
    const exercicios = await Exercicio.find();
    res.json(exercicios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const exercicio = await Exercicio.findById(req.params.id);
    if (!exercicio) {
      return res.status(404).json({ error: 'Exercício não encontrado' });
    }
    res.json(exercicio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getByGrupo = async (req, res) => {
  try {
    const exercicios = await Exercicio.find({ grupoMuscular: req.params.grupoMuscular });
    res.json(exercicios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
