const { Treino } = require('../../models');

exports.deleteTreino = async (req, res) => {
  try {
    const treino = await Treino.findByIdAndDelete(req.params.id);
    if (!treino) {
      return res.status(404).json({ error: 'Treino não encontrado' });
    }
    res.json({ message: 'Treino deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
