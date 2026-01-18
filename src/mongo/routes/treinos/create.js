const { Treino } = require('@models');

exports.createTreino = async (req, res) => {
  try {
    const treino = new Treino(req.body);
    await treino.save();
    res.status(201).json(treino);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
