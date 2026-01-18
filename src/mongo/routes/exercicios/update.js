const { Exercicio } = require('../../models');

exports.updateExercicio = async (req, res) => {
  try {
    const exercicio = await Exercicio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!exercicio) {
      return res.status(404).json({ error: 'Exercício não encontrado' });
    }
    res.json(exercicio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
