const { Educador } = require('../../models');

exports.deleteEducador = async (req, res) => {
  try {
    const educador = await Educador.findByIdAndDelete(req.params.id);
    if (!educador) {
      return res.status(404).json({ error: 'Educador não encontrado' });
    }
    res.json({ message: 'Educador deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
