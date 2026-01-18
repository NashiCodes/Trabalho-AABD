const { Educador } = require('@models');

exports.createEducador = async (req, res) => {
  try {
    const educador = new Educador(req.body);
    await educador.save();
    res.status(201).json(educador);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
