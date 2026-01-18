const { Exercicio } = require('@models');

exports.createExercicio = async (req, res) => {
  try {
    const exercicio = new Exercicio(req.body);
    await exercicio.save();
    res.status(201).json(exercicio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
