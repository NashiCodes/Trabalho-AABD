const { Treino } = require('@models');

const createTreino = async (treinoData) => {
  const treino = new Treino(treinoData);
  await treino.save();
  return treino;
};

const updateTreino = async (id, treinoData) => {
  const treino = await Treino.findByIdAndUpdate(id, treinoData, {
    new: true,
    runValidators: true,
  })
    .populate('criadoPor', 'nome cref')
    .populate('exercicios.exercicioId', 'nome grupoMuscular');
  return treino;
};

const getAllTreinos = async (options = {}) => {
  const { limit, skip, sort = { nome: 1 } } = options;
  let query = Treino.find()
    .populate('criadoPor', 'nome cref')
    .populate('exercicios.exercicioId', 'nome grupoMuscular');

  if (sort) {
    query = query.sort(sort);
  }
  if (skip) {
    query = query.skip(skip);
  }
  if (limit) {
    query = query.limit(limit);
  }

  const treinos = await query.exec();
  return treinos;
};

const getTreinoById = async (id) => {
  const treino = await Treino.findById(id)
    .populate('criadoPor', 'nome cref especialidades')
    .populate('exercicios.exercicioId', 'nome grupoMuscular tipo equipamento');
  return treino;
};

const getTreinosByEducador = async (educadorId) => {
  const treinos = await Treino.find({ criadoPor: educadorId })
    .populate('exercicios.exercicioId', 'nome grupoMuscular')
    .sort({ nome: 1 });
  return treinos;
};

const findTreinosByFilters = async (filters) => {
  const query = {};

  if (filters.nivel) {
    query.nivel = filters.nivel;
  }
  if (filters.objetivo) {
    query.objetivo = { $regex: filters.objetivo, $options: 'i' };
  }
  if (filters.tag) {
    query.tags = filters.tag;
  }
  if (filters.duracaoMax) {
    query.duracaoEstimada = { $lte: filters.duracaoMax };
  }

  const treinos = await Treino.find(query)
    .populate('criadoPor', 'nome cref')
    .populate('exercicios.exercicioId', 'nome')
    .sort({ nome: 1 });
  return treinos;
};

const searchTreinos = async (searchTerm) => {
  const treinos = await Treino.find({
    $text: { $search: searchTerm },
  })
    .populate('criadoPor', 'nome cref')
    .populate('exercicios.exercicioId', 'nome')
    .sort({ score: { $meta: 'textScore' } });
  return treinos;
};

const countTreinos = async (filters = {}) => {
  const count = await Treino.countDocuments(filters);
  return count;
};

const deleteTreino = async (id) => {
  const treino = await Treino.findByIdAndDelete(id);
  return treino;
};

const treinoExists = async (id) => {
  const exists = await Treino.exists({ _id: id });
  return !!exists;
};

const adicionarExercicio = async (treinoId, exercicioData) => {
  const treino = await Treino.findByIdAndUpdate(
    treinoId,
    { $push: { exercicios: exercicioData } },
    { new: true, runValidators: true }
  );
  return treino;
};

const removerExercicio = async (treinoId, exercicioId) => {
  const treino = await Treino.findByIdAndUpdate(
    treinoId,
    { $pull: { exercicios: { _id: exercicioId } } },
    { new: true }
  );
  return treino;
};

module.exports = {
  createTreino,
  updateTreino,
  getAllTreinos,
  getTreinoById,
  getTreinosByEducador,
  findTreinosByFilters,
  searchTreinos,
  countTreinos,
  deleteTreino,
  treinoExists,
  adicionarExercicio,
  removerExercicio,
};
