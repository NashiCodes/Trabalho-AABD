const { Avaliacao } = require('../../models');

exports.deleteAvaliacao = async (req, res) => {
  try {
    const avaliacao = await Avaliacao.findByIdAndDelete(req.params.id);
    if (!avaliacao) {
      return res.status(404).json({ error: 'Avaliação não encontrada' });
    }
    res.json({ message: 'Avaliação deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
