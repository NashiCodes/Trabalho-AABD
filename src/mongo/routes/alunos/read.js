const { Aluno } = require('@models');

exports.getAll = async (req, res) => {
  try {
    const alunos = await Aluno.find().populate('educadorId', 'nome cref');
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id).populate(
      'educadorId',
      'nome cref especialidades'
    );
    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    res.json(aluno);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getByEducador = async (req, res) => {
  try {
    const alunos = await Aluno.find({ educadorId: req.params.educadorId });
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
