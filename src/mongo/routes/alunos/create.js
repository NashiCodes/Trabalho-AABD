const { updateOrSaveAluno } = require('@mongo/services/alunoService');

exports.createAluno = async (req, res) => {
  try {
    const alunoData = req.body;
    const savedAluno = await updateOrSaveAluno(null, alunoData);
    res.status(201).json(savedAluno);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
