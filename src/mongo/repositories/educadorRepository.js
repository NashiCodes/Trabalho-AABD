const { Educador } = require('@models');

const createEducador = async (educadorData) => {
  const educador = new Educador(educadorData);
  await educador.save();
  return educador;
};

const updateEducador = async (id, educadorData) => {
  const educador = await Educador.findByIdAndUpdate(id, educadorData, {
    new: true,
    runValidators: true,
  });
  return educador;
};

const getAllEducadores = async (options = {}) => {
  const { limit, skip, sort = { nome: 1 } } = options;
  let query = Educador.find();

  if (sort) {
    query = query.sort(sort);
  }
  if (skip) {
    query = query.skip(skip);
  }
  if (limit) {
    query = query.limit(limit);
  }

  const educadores = await query.exec();
  return educadores;
};

const getEducadorById = async (id) => {
  const educador = await Educador.findById(id);
  return educador;
};

const getEducadorByCref = async (cref) => {
  const educador = await Educador.findOne({ cref });
  return educador;
};

const findEducadoresByFilters = async (filters) => {
  const query = {};

  if (filters.especialidade) {
    query.especialidades = filters.especialidade;
  }
  if (filters.avaliacaoMinima) {
    query.avaliacaoMedia = { $gte: filters.avaliacaoMinima };
  }
  if (filters.alunosAtivosMin || filters.alunosAtivosMax) {
    query.alunosAtivos = {};
    if (filters.alunosAtivosMin) {
      query.alunosAtivos.$gte = filters.alunosAtivosMin;
    }
    if (filters.alunosAtivosMax) {
      query.alunosAtivos.$lte = filters.alunosAtivosMax;
    }
  }

  const educadores = await Educador.find(query).sort({ avaliacaoMedia: -1 });
  return educadores;
};

const countEducadores = async (filters = {}) => {
  const count = await Educador.countDocuments(filters);
  return count;
};

const deleteEducador = async (id) => {
  const educador = await Educador.findByIdAndDelete(id);
  return educador;
};

const educadorExists = async (id) => {
  const exists = await Educador.exists({ _id: id });
  return !!exists;
};

const incrementarAlunosAtivos = async (id) => {
  const educador = await Educador.findByIdAndUpdate(
    id,
    { $inc: { alunosAtivos: 1 } },
    { new: true }
  );
  return educador;
};

const decrementarAlunosAtivos = async (id) => {
  const educador = await Educador.findByIdAndUpdate(
    id,
    { $inc: { alunosAtivos: -1 } },
    { new: true }
  );
  return educador;
};

module.exports = {
  createEducador,
  updateEducador,
  getAllEducadores,
  getEducadorById,
  getEducadorByCref,
  findEducadoresByFilters,
  countEducadores,
  deleteEducador,
  educadorExists,
  incrementarAlunosAtivos,
  decrementarAlunosAtivos,
};
