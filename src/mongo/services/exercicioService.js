const {
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
} = require('@repositories/exercicioRepository');

const criarExercicio = async (exercicioData) => {
  try {
    if (!exercicioData.nome) {
      throw new Error('Nome é obrigatório');
    }

    const nomeExistente = await getExercicioByNome(exercicioData.nome);
    if (nomeExistente) {
      throw new Error('Exercício com este nome já cadastrado');
    }

    const exercicio = await createExercicio(exercicioData);
    return exercicio;
  } catch (error) {
    throw new Error(`Erro ao criar exercício: ${error.message}`);
  }
};

const atualizarExercicio = async (id, exercicioData) => {
  try {
    const exists = await exercicioExists(id);
    if (!exists) {
      throw new Error('Exercício não encontrado');
    }

    if (exercicioData.nome) {
      const nomeExistente = await getExercicioByNome(exercicioData.nome);
      if (nomeExistente && nomeExistente._id.toString() !== id) {
        throw new Error('Exercício com este nome já cadastrado');
      }
    }

    const exercicio = await updateExercicio(id, exercicioData);
    if (!exercicio) {
      throw new Error('Erro ao atualizar exercício');
    }

    return exercicio;
  } catch (error) {
    throw new Error(`Erro ao atualizar exercício: ${error.message}`);
  }
};

const salvarExercicio = async (id, exercicioData) => {
  if (!id) {
    return await criarExercicio(exercicioData);
  } else {
    return await atualizarExercicio(id, exercicioData);
  }
};

const listarExercicios = async (options = {}) => {
  try {
    const { page = 1, pageSize = 10, sort } = options;
    const skip = (page - 1) * pageSize;

    const [exercicios, total] = await Promise.all([
      getAllExercicios({ limit: pageSize, skip, sort }),
      countExercicios(),
    ]);

    return {
      exercicios,
      total,
      page,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (error) {
    throw new Error(`Erro ao listar exercícios: ${error.message}`);
  }
};

const buscarExercicioPorId = async (id) => {
  try {
    const exercicio = await getExercicioById(id);
    if (!exercicio) {
      throw new Error('Exercício não encontrado');
    }
    return exercicio;
  } catch (error) {
    throw new Error(`Erro ao buscar exercício: ${error.message}`);
  }
};

const buscarExerciciosComFiltros = async (filters) => {
  try {
    const exercicios = await findExerciciosByFilters(filters);
    return exercicios;
  } catch (error) {
    throw new Error(`Erro ao buscar exercícios com filtros: ${error.message}`);
  }
};

const pesquisarExercicios = async (searchTerm) => {
  try {
    if (!searchTerm || searchTerm.trim().length < 2) {
      throw new Error('Termo de busca deve ter pelo menos 2 caracteres');
    }

    const exercicios = await searchExercicios(searchTerm);
    return exercicios;
  } catch (error) {
    throw new Error(`Erro ao pesquisar exercícios: ${error.message}`);
  }
};

const deletarExercicio = async (id) => {
  try {
    const exists = await exercicioExists(id);
    if (!exists) {
      throw new Error('Exercício não encontrado');
    }

    const exercicio = await deleteExercicio(id);
    return exercicio;
  } catch (error) {
    throw new Error(`Erro ao deletar exercício: ${error.message}`);
  }
};

module.exports = {
  criarExercicio,
  atualizarExercicio,
  salvarExercicio,
  listarExercicios,
  buscarExercicioPorId,
  buscarExerciciosComFiltros,
  pesquisarExercicios,
  deletarExercicio,
};
