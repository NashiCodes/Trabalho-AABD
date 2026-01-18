const { Avaliacao } = require('../../models');

exports.createAvaliacao = async (req, res) => {
  try {
    const avaliacao = new Avaliacao(req.body);
    await avaliacao.save();
    res.status(201).json(avaliacao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
