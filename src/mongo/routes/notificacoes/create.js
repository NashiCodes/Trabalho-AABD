const { Notificacao } = require('../../models');

exports.createNotificacao = async (req, res) => {
  try {
    const notificacao = new Notificacao(req.body);
    await notificacao.save();
    res.status(201).json(notificacao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
