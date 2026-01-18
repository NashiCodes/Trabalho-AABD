const {
  createAvaliacao,
  updateAvaliacao,
  getAllAvaliacoes,
  getAvaliacaoById,
  getAvaliacoesByEducador,
  getAvaliacoesByAluno,
  findAvaliacoesByFilters,
  getMediaAvaliacoesEducador,
  countAvaliacoes,
  deleteAvaliacao,
  avaliacaoExists,
} = require('@repositories/avaliacaoRepository');
const { alunoExists } = require('@repositories/alunoRepository');
const { educadorExists } = require('@repositories/educadorRepository');

const criarAvaliacao = async (avaliacaoData) => {
  try {
    if (!avaliacaoData.alunoId) {
      throw new Error('Aluno é obrigatório');
    }

    if (!avaliacaoData.educadorId) {
      throw new Error('Educador é obrigatório');
    }

    if (!avaliacaoData.nota) {
      throw new Error('Nota é obrigatória');
    }

    const alunoExiste = await alunoExists(avaliacaoData.alunoId);
    if (!alunoExiste) {
      throw new Error('Aluno não encontrado');
    }

    const educadorExiste = await educadorExists(avaliacaoData.educadorId);
    if (!educadorExiste) {
      throw new Error('Educador não encontrado');
    }

    if (avaliacaoData.nota < 1 || avaliacaoData.nota > 5) {
      throw new Error('Nota deve estar entre 1 e 5');
    }

    const avaliacao = await createAvaliacao(avaliacaoData);
    return avaliacao;
  } catch (error) {
    throw new Error(`Erro ao criar avaliação: ${error.message}`);
  }
};

const atualizarAvaliacao = async (id, avaliacaoData) => {
  try {
    const exists = await avaliacaoExists(id);
    if (!exists) {
      throw new Error('Avaliação não encontrada');
    }

    if (avaliacaoData.nota && (avaliacaoData.nota < 1 || avaliacaoData.nota > 5)) {
      throw new Error('Nota deve estar entre 1 e 5');
    }

    const avaliacao = await updateAvaliacao(id, avaliacaoData);
    if (!avaliacao) {
      throw new Error('Erro ao atualizar avaliação');
    }

    return avaliacao;
  } catch (error) {
    throw new Error(`Erro ao atualizar avaliação: ${error.message}`);
  }
};

const salvarAvaliacao = async (id, avaliacaoData) => {
  if (!id) {
    return await criarAvaliacao(avaliacaoData);
  } else {
    return await atualizarAvaliacao(id, avaliacaoData);
  }
};

const listarAvaliacoes = async (options = {}) => {
  try {
    const { page = 1, pageSize = 10, sort } = options;
    const skip = (page - 1) * pageSize;

    const [avaliacoes, total] = await Promise.all([
      getAllAvaliacoes({ limit: pageSize, skip, sort }),
      countAvaliacoes(),
    ]);

    return {
      avaliacoes,
      total,
      page,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (error) {
    throw new Error(`Erro ao listar avaliações: ${error.message}`);
  }
};

const buscarAvaliacaoPorId = async (id) => {
  try {
    const avaliacao = await getAvaliacaoById(id);
    if (!avaliacao) {
      throw new Error('Avaliação não encontrada');
    }
    return avaliacao;
  } catch (error) {
    throw new Error(`Erro ao buscar avaliação: ${error.message}`);
  }
};

const listarAvaliacoesPorEducador = async (educadorId, options = {}) => {
  try {
    const educadorExiste = await educadorExists(educadorId);
    if (!educadorExiste) {
      throw new Error('Educador não encontrado');
    }

    const avaliacoes = await getAvaliacoesByEducador(educadorId, options);
    return avaliacoes;
  } catch (error) {
    throw new Error(`Erro ao buscar avaliações do educador: ${error.message}`);
  }
};

const listarAvaliacoesPorAluno = async (alunoId, options = {}) => {
  try {
    const alunoExiste = await alunoExists(alunoId);
    if (!alunoExiste) {
      throw new Error('Aluno não encontrado');
    }

    const avaliacoes = await getAvaliacoesByAluno(alunoId, options);
    return avaliacoes;
  } catch (error) {
    throw new Error(`Erro ao buscar avaliações do aluno: ${error.message}`);
  }
};

const buscarAvaliacoesComFiltros = async (filters) => {
  try {
    const avaliacoes = await findAvaliacoesByFilters(filters);
    return avaliacoes;
  } catch (error) {
    throw new Error(`Erro ao buscar avaliações com filtros: ${error.message}`);
  }
};

const obterMediaEducador = async (educadorId) => {
  try {
    const educadorExiste = await educadorExists(educadorId);
    if (!educadorExiste) {
      throw new Error('Educador não encontrado');
    }

    const media = await getMediaAvaliacoesEducador(educadorId);
    return media;
  } catch (error) {
    throw new Error(`Erro ao obter média do educador: ${error.message}`);
  }
};

const deletarAvaliacao = async (id) => {
  try {
    const exists = await avaliacaoExists(id);
    if (!exists) {
      throw new Error('Avaliação não encontrada');
    }

    const avaliacao = await deleteAvaliacao(id);
    return avaliacao;
  } catch (error) {
    throw new Error(`Erro ao deletar avaliação: ${error.message}`);
  }
};

module.exports = {
  criarAvaliacao,
  atualizarAvaliacao,
  salvarAvaliacao,
  listarAvaliacoes,
  buscarAvaliacaoPorId,
  listarAvaliacoesPorEducador,
  listarAvaliacoesPorAluno,
  buscarAvaliacoesComFiltros,
  obterMediaEducador,
  deletarAvaliacao,
};
