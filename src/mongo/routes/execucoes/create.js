const { Execucao } = require('../../models');

exports.createExecucao = async (req, res) => {
  try {
    const execucao = new Execucao(req.body);
    await execucao.save();
    res.status(201).json(execucao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
