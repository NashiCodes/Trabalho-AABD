const { Notificacao } = require('@models');

exports.marcarComoLida = async (req, res) => {
  try {
    const notificacao = await Notificacao.findByIdAndUpdate(
      req.params.id,
      { lida: true, dataLeitura: new Date() },
      { new: true }
    );
    if (!notificacao) {
      return res.status(404).json({ error: 'Notificação não encontrada' });
    }
    res.json(notificacao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
