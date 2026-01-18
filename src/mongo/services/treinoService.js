const {
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
} = require('@repositories/treinoRepository');
const { exercicioExists } = require('@repositories/exercicioRepository');
const { educadorExists } = require('@repositories/educadorRepository');

const criarTreino = async (treinoData) => {
  try {
    if (!treinoData.criadoPor) {
      throw new Error('Educador criador é obrigatório');
    }

    const educadorExiste = await educadorExists(treinoData.criadoPor);
    if (!educadorExiste) {
      throw new Error('Educador não encontrado');
    }

    if (!treinoData.exercicios || treinoData.exercicios.length === 0) {
      throw new Error('O treino deve ter pelo menos um exercício');
    }

    for (const ex of treinoData.exercicios) {
      const exercicioExiste = await exercicioExists(ex.exercicioId);
      if (!exercicioExiste) {
        throw new Error(`Exercício ${ex.exercicioId} não encontrado`);
      }
    }

    const treino = await createTreino(treinoData);
    return treino;
  } catch (error) {
    throw new Error(`Erro ao criar treino: ${error.message}`);
  }
};

const atualizarTreino = async (id, treinoData) => {
  try {
    const exists = await treinoExists(id);
    if (!exists) {
      throw new Error('Treino não encontrado');
    }

    if (treinoData.exercicios && treinoData.exercicios.length > 0) {
      for (const ex of treinoData.exercicios) {
        const exercicioExiste = await exercicioExists(ex.exercicioId);
        if (!exercicioExiste) {
          throw new Error(`Exercício ${ex.exercicioId} não encontrado`);
        }
      }
    }

    const treino = await updateTreino(id, treinoData);
    if (!treino) {
      throw new Error('Erro ao atualizar treino');
    }

    return treino;
  } catch (error) {
    throw new Error(`Erro ao atualizar treino: ${error.message}`);
  }
};

const salvarTreino = async (id, treinoData) => {
  if (!id) {
    return await criarTreino(treinoData);
  } else {
    return await atualizarTreino(id, treinoData);
  }
};

const listarTreinos = async (options = {}) => {
  try {
    const { page = 1, pageSize = 10, sort } = options;
    const skip = (page - 1) * pageSize;

    const [treinos, total] = await Promise.all([
      getAllTreinos({ limit: pageSize, skip, sort }),
      countTreinos(),
    ]);

    return {
      treinos,
      total,
      page,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (error) {
    throw new Error(`Erro ao listar treinos: ${error.message}`);
  }
};

const buscarTreinoPorId = async (id) => {
  try {
    const treino = await getTreinoById(id);
    if (!treino) {
      throw new Error('Treino não encontrado');
    }
    return treino;
  } catch (error) {
    throw new Error(`Erro ao buscar treino: ${error.message}`);
  }
};

const listarTreinosPorEducador = async (educadorId) => {
  try {
    const educadorExiste = await educadorExists(educadorId);
    if (!educadorExiste) {
      throw new Error('Educador não encontrado');
    }

    const treinos = await getTreinosByEducador(educadorId);
    return treinos;
  } catch (error) {
    throw new Error(`Erro ao buscar treinos do educador: ${error.message}`);
  }
};

const buscarTreinosComFiltros = async (filters) => {
  try {
    const treinos = await findTreinosByFilters(filters);
    return treinos;
  } catch (error) {
    throw new Error(`Erro ao buscar treinos com filtros: ${error.message}`);
  }
};

const pesquisarTreinos = async (searchTerm) => {
  try {
    if (!searchTerm || searchTerm.trim().length < 2) {
      throw new Error('Termo de busca deve ter pelo menos 2 caracteres');
    }

    const treinos = await searchTreinos(searchTerm);
    return treinos;
  } catch (error) {
    throw new Error(`Erro ao pesquisar treinos: ${error.message}`);
  }
};

const deletarTreino = async (id) => {
  try {
    const exists = await treinoExists(id);
    if (!exists) {
      throw new Error('Treino não encontrado');
    }

    const treino = await deleteTreino(id);
    return treino;
  } catch (error) {
    throw new Error(`Erro ao deletar treino: ${error.message}`);
  }
};

const incluirExercicio = async (treinoId, exercicioData) => {
  try {
    const treinoExiste = await treinoExists(treinoId);
    if (!treinoExiste) {
      throw new Error('Treino não encontrado');
    }

    const exercicioExiste = await exercicioExists(exercicioData.exercicioId);
    if (!exercicioExiste) {
      throw new Error('Exercício não encontrado');
    }

    const treino = await adicionarExercicio(treinoId, exercicioData);
    return treino;
  } catch (error) {
    throw new Error(`Erro ao adicionar exercício ao treino: ${error.message}`);
  }
};

const excluirExercicio = async (treinoId, exercicioId) => {
  try {
    const treinoExiste = await treinoExists(treinoId);
    if (!treinoExiste) {
      throw new Error('Treino não encontrado');
    }

    const treino = await removerExercicio(treinoId, exercicioId);
    return treino;
  } catch (error) {
    throw new Error(`Erro ao remover exercício do treino: ${error.message}`);
  }
};

module.exports = {
  criarTreino,
  atualizarTreino,
  salvarTreino,
  listarTreinos,
  buscarTreinoPorId,
  listarTreinosPorEducador,
  buscarTreinosComFiltros,
  pesquisarTreinos,
  deletarTreino,
  incluirExercicio,
  excluirExercicio,
};
