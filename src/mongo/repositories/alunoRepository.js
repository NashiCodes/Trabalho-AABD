const { Aluno } = require('@models');

const createAluno = async (alunoData) => {
  const aluno = new Aluno(alunoData);
  await aluno.save();
  return aluno;
};

const updateAluno = async (id, alunoData) => {
  const aluno = await Aluno.findByIdAndUpdate(id, alunoData, {
    new: true,
    runValidators: true,
  }).populate('educadorId', 'nome cref especialidades');
  return aluno;
};

const getAllAlunos = async (options = {}) => {
  const { limit, skip, sort = { nome: 1 } } = options;
  let query = Aluno.find().populate('educadorId', 'nome cref');

  if (sort) {
    query = query.sort(sort);
  }
  if (skip) {
    query = query.skip(skip);
  }
  if (limit) {
    query = query.limit(limit);
  }

  const alunos = await query.exec();
  return alunos;
};

const getAlunoById = async (id) => {
  const aluno = await Aluno.findById(id).populate('educadorId', 'nome cref especialidades');
  return aluno;
};

const getAlunosByEducador = async (educadorId) => {
  const alunos = await Aluno.find({ educadorId }).sort({ nome: 1 });
  return alunos;
};

const findAlunosByFilters = async (filters) => {
  const query = {};

  if (filters.nivel) {
    query.nivel = filters.nivel;
  }
  if (filters.genero) {
    query['dadosPessoais.genero'] = filters.genero;
  }
  if (filters.pesoMin || filters.pesoMax) {
    query['dadosFisicos.peso'] = {};
    if (filters.pesoMin) {
      query['dadosFisicos.peso'].$gte = filters.pesoMin;
    }
    if (filters.pesoMax) {
      query['dadosFisicos.peso'].$lte = filters.pesoMax;
    }
  }

  const alunos = await Aluno.find(query).populate('educadorId', 'nome cref');
  return alunos;
};

const countAlunos = async (filters = {}) => {
  const count = await Aluno.countDocuments(filters);
  return count;
};

const deleteAluno = async (id) => {
  const aluno = await Aluno.findByIdAndDelete(id);
  return aluno;
};

const alunoExists = async (id) => {
  const exists = await Aluno.exists({ _id: id });
  return !!exists;
};

module.exports = {
  createAluno,
  updateAluno,
  getAllAlunos,
  getAlunoById,
  getAlunosByEducador,
  findAlunosByFilters,
  countAlunos,
  deleteAluno,
  alunoExists,
};
