const { Execucao } = require('../../models');

exports.deleteExecucao = async (req, res) => {
  try {
    const execucao = await Execucao.findByIdAndDelete(req.params.id);
    if (!execucao) {
      return res.status(404).json({ error: 'Execução não encontrada' });
    }
    res.json({ message: 'Execução deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
