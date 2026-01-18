const { Avaliacao } = require('../../models');

exports.updateAvaliacao = async (req, res) => {
  try {
    const avaliacao = await Avaliacao.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!avaliacao) {
      return res.status(404).json({ error: 'Avaliação não encontrada' });
    }
    res.json(avaliacao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
