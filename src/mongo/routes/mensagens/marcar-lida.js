const { Mensagem } = require('@models');

exports.marcarComoLida = async (req, res) => {
  try {
    const mensagem = await Mensagem.findByIdAndUpdate(
      req.params.id,
      { lida: true, dataLeitura: new Date() },
      { new: true }
    );
    if (!mensagem) {
      return res.status(404).json({ error: 'Mensagem não encontrada' });
    }
    res.json(mensagem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
