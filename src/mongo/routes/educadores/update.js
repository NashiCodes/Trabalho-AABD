const { Educador } = require('@models');

exports.updateEducador = async (req, res) => {
  try {
    const educador = await Educador.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!educador) {
      return res.status(404).json({ error: 'Educador não encontrado' });
    }
    res.json(educador);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
