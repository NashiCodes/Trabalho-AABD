const { Educador } = require('../../models');

exports.getAll = async (req, res) => {
  try {
    const educadores = await Educador.find();
    res.json(educadores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const educador = await Educador.findById(req.params.id);
    if (!educador) {
      return res.status(404).json({ error: 'Educador não encontrado' });
    }
    res.json(educador);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
