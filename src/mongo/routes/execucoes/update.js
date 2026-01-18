const { Execucao } = require('@models');

exports.updateExecucao = async (req, res) => {
  try {
    const execucao = await Execucao.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!execucao) {
      return res.status(404).json({ error: 'Execução não encontrada' });
    }
    res.json(execucao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
