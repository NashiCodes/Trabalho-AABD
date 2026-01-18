const { Aluno } = require('../../models');

exports.createAluno = async (req, res) => {
  try {
    const aluno = new Aluno(req.body);
    await aluno.save();
    res.status(201).json(aluno);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
