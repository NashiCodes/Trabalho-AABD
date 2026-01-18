const { Exercicio } = require('@models');

const createExercicio = async (exercicioData) => {
  const exercicio = new Exercicio(exercicioData);
  await exercicio.save();
  return exercicio;
};

const updateExercicio = async (id, exercicioData) => {
  const exercicio = await Exercicio.findByIdAndUpdate(id, exercicioData, {
    new: true,
    runValidators: true,
  });
  return exercicio;
};

const getAllExercicios = async (options = {}) => {
  const { limit, skip, sort = { nome: 1 } } = options;
  let query = Exercicio.find();

  if (sort) {
    query = query.sort(sort);
  }
  if (skip) {
    query = query.skip(skip);
  }
  if (limit) {
    query = query.limit(limit);
  }

  const exercicios = await query.exec();
  return exercicios;
};

const getExercicioById = async (id) => {
  const exercicio = await Exercicio.findById(id);
  return exercicio;
};

const getExercicioByNome = async (nome) => {
  const exercicio = await Exercicio.findOne({ nome });
  return exercicio;
};

const findExerciciosByFilters = async (filters) => {
  const query = {};

  if (filters.grupoMuscular) {
    query.grupoMuscular = filters.grupoMuscular;
  }
  if (filters.tipo) {
    query.tipo = filters.tipo;
  }
  if (filters.nivelDificuldade) {
    query.nivelDificuldade = filters.nivelDificuldade;
  }
  if (filters.equipamento) {
    query.equipamento = filters.equipamento;
  }

  const exercicios = await Exercicio.find(query).sort({ nome: 1 });
  return exercicios;
};

const searchExercicios = async (searchTerm) => {
  const exercicios = await Exercicio.find({
    $or: [
      { nome: { $regex: searchTerm, $options: 'i' } },
      { descricaoTecnica: { $regex: searchTerm, $options: 'i' } },
    ],
  }).sort({ nome: 1 });
  return exercicios;
};

const countExercicios = async (filters = {}) => {
  const count = await Exercicio.countDocuments(filters);
  return count;
};

const deleteExercicio = async (id) => {
  const exercicio = await Exercicio.findByIdAndDelete(id);
  return exercicio;
};

const exercicioExists = async (id) => {
  const exists = await Exercicio.exists({ _id: id });
  return !!exists;
};

module.exports = {
  createExercicio,
  updateExercicio,
  getAllExercicios,
  getExercicioById,
  getExercicioByNome,
  findExerciciosByFilters,
  searchExercicios,
  countExercicios,
  deleteExercicio,
  exercicioExists,
};
