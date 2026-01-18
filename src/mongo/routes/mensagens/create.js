const { Mensagem } = require('@models');

exports.createMensagem = async (req, res) => {
  try {
    const mensagem = new Mensagem(req.body);
    await mensagem.save();
    res.status(201).json(mensagem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
