const { Exercicio } = require('@models');

exports.deleteExercicio = async (req, res) => {
  try {
    const exercicio = await Exercicio.findByIdAndDelete(req.params.id);
    if (!exercicio) {
      return res.status(404).json({ error: 'Exercício não encontrado' });
    }
    res.json({ message: 'Exercício deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
