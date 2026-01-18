const {
  createExecucao,
  updateExecucao,
  getAllExecucoes,
  getExecucaoById,
  getExecucoesByAluno,
  getExecucoesByTreino,
  findExecucoesByFilters,
  countExecucoes,
  deleteExecucao,
  execucaoExists,
  getEstatisticasAluno,
} = require('@repositories/execucaoRepository');
const { alunoExists } = require('@repositories/alunoRepository');
const { treinoExists } = require('@repositories/treinoRepository');

const criarExecucao = async (execucaoData) => {
  try {
    if (!execucaoData.alunoId) {
      throw new Error('Aluno é obrigatório');
    }

    if (!execucaoData.treinoId) {
      throw new Error('Treino é obrigatório');
    }

    const alunoExiste = await alunoExists(execucaoData.alunoId);
    if (!alunoExiste) {
      throw new Error('Aluno não encontrado');
    }

    const treinoExiste = await treinoExists(execucaoData.treinoId);
    if (!treinoExiste) {
      throw new Error('Treino não encontrado');
    }

    const execucao = await createExecucao(execucaoData);
    return execucao;
  } catch (error) {
    throw new Error(`Erro ao criar execução: ${error.message}`);
  }
};

const atualizarExecucao = async (id, execucaoData) => {
  try {
    const exists = await execucaoExists(id);
    if (!exists) {
      throw new Error('Execução não encontrada');
    }

    const execucao = await updateExecucao(id, execucaoData);
    if (!execucao) {
      throw new Error('Erro ao atualizar execução');
    }

    return execucao;
  } catch (error) {
    throw new Error(`Erro ao atualizar execução: ${error.message}`);
  }
};

const salvarExecucao = async (id, execucaoData) => {
  if (!id) {
    return await criarExecucao(execucaoData);
  } else {
    return await atualizarExecucao(id, execucaoData);
  }
};

const listarExecucoes = async (options = {}) => {
  try {
    const { page = 1, pageSize = 10, sort } = options;
    const skip = (page - 1) * pageSize;

    const [execucoes, total] = await Promise.all([
      getAllExecucoes({ limit: pageSize, skip, sort }),
      countExecucoes(),
    ]);

    return {
      execucoes,
      total,
      page,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (error) {
    throw new Error(`Erro ao listar execuções: ${error.message}`);
  }
};

const buscarExecucaoPorId = async (id) => {
  try {
    const execucao = await getExecucaoById(id);
    if (!execucao) {
      throw new Error('Execução não encontrada');
    }
    return execucao;
  } catch (error) {
    throw new Error(`Erro ao buscar execução: ${error.message}`);
  }
};

const listarExecucoesPorAluno = async (alunoId, options = {}) => {
  try {
    const alunoExiste = await alunoExists(alunoId);
    if (!alunoExiste) {
      throw new Error('Aluno não encontrado');
    }

    const execucoes = await getExecucoesByAluno(alunoId, options);
    return execucoes;
  } catch (error) {
    throw new Error(`Erro ao buscar execuções do aluno: ${error.message}`);
  }
};

const listarExecucoesPorTreino = async (treinoId, options = {}) => {
  try {
    const treinoExiste = await treinoExists(treinoId);
    if (!treinoExiste) {
      throw new Error('Treino não encontrado');
    }

    const execucoes = await getExecucoesByTreino(treinoId, options);
    return execucoes;
  } catch (error) {
    throw new Error(`Erro ao buscar execuções do treino: ${error.message}`);
  }
};

const buscarExecucoesComFiltros = async (filters) => {
  try {
    const execucoes = await findExecucoesByFilters(filters);
    return execucoes;
  } catch (error) {
    throw new Error(`Erro ao buscar execuções com filtros: ${error.message}`);
  }
};

const deletarExecucao = async (id) => {
  try {
    const exists = await execucaoExists(id);
    if (!exists) {
      throw new Error('Execução não encontrada');
    }

    const execucao = await deleteExecucao(id);
    return execucao;
  } catch (error) {
    throw new Error(`Erro ao deletar execução: ${error.message}`);
  }
};

const obterEstatisticasAluno = async (alunoId) => {
  try {
    const alunoExiste = await alunoExists(alunoId);
    if (!alunoExiste) {
      throw new Error('Aluno não encontrado');
    }

    const estatisticas = await getEstatisticasAluno(alunoId);
    return estatisticas;
  } catch (error) {
    throw new Error(`Erro ao obter estatísticas do aluno: ${error.message}`);
  }
};

const concluirExecucao = async (id, feedbackData = {}) => {
  try {
    const exists = await execucaoExists(id);
    if (!exists) {
      throw new Error('Execução não encontrada');
    }

    const execucao = await updateExecucao(id, {
      concluido: true,
      ...feedbackData,
    });

    return execucao;
  } catch (error) {
    throw new Error(`Erro ao concluir execução: ${error.message}`);
  }
};

module.exports = {
  criarExecucao,
  atualizarExecucao,
  salvarExecucao,
  listarExecucoes,
  buscarExecucaoPorId,
  listarExecucoesPorAluno,
  listarExecucoesPorTreino,
  buscarExecucoesComFiltros,
  deletarExecucao,
  obterEstatisticasAluno,
  concluirExecucao,
};
