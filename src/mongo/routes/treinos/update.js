const { Treino } = require('../../models');

exports.updateTreino = async (req, res) => {
  try {
    const treino = await Treino.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!treino) {
      return res.status(404).json({ error: 'Treino não encontrado' });
    }
    res.json(treino);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
