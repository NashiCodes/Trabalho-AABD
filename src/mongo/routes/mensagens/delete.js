const { Mensagem } = require('@models');

exports.deleteMensagem = async (req, res) => {
  try {
    const mensagem = await Mensagem.findByIdAndDelete(req.params.id);
    if (!mensagem) {
      return res.status(404).json({ error: 'Mensagem não encontrada' });
    }
    res.json({ message: 'Mensagem deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
