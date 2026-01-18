const { Notificacao } = require('@models');

exports.deleteNotificacao = async (req, res) => {
  try {
    const notificacao = await Notificacao.findByIdAndDelete(req.params.id);
    if (!notificacao) {
      return res.status(404).json({ error: 'Notificação não encontrada' });
    }
    res.json({ message: 'Notificação deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
