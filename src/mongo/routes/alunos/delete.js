const { Aluno } = require('../../models');

exports.deleteAluno = async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndDelete(req.params.id);
    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    res.json({ message: 'Aluno deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
