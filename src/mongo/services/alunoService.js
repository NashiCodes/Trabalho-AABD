const {
  createAluno,
  updateAluno,
  getAllAlunos,
  getAlunoById,
  getAlunosByEducador,
  findAlunosByFilters,
  countAlunos,
  deleteAluno,
  alunoExists,
} = require('@repositories/alunoRepository');

const criarAluno = async (alunoData) => {
  try {
    if (!alunoData.educadorId) {
      throw new Error('Educador é obrigatório');
    }

    const aluno = await createAluno(alunoData);
    return aluno;
  } catch (error) {
    throw new Error(`Erro ao criar aluno: ${error.message}`);
  }
};

const atualizarAluno = async (id, alunoData) => {
  try {
    const exists = await alunoExists(id);
    if (!exists) {
      throw new Error('Aluno não encontrado');
    }

    const aluno = await updateAluno(id, alunoData);
    if (!aluno) {
      throw new Error('Erro ao atualizar aluno');
    }

    return aluno;
  } catch (error) {
    throw new Error(`Erro ao atualizar aluno: ${error.message}`);
  }
};

const salvarAluno = async (id, alunoData) => {
  if (!id) {
    return await criarAluno(alunoData);
  } else {
    return await atualizarAluno(id, alunoData);
  }
};

const listarAlunos = async (options = {}) => {
  try {
    const { page = 1, pageSize = 10, sort } = options;
    const skip = (page - 1) * pageSize;

    const [alunos, total] = await Promise.all([
      getAllAlunos({ limit: pageSize, skip, sort }),
      countAlunos(),
    ]);

    return {
      alunos,
      total,
      page,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (error) {
    throw new Error(`Erro ao listar alunos: ${error.message}`);
  }
};

const buscarAlunoPorId = async (id) => {
  try {
    const aluno = await getAlunoById(id);
    if (!aluno) {
      throw new Error('Aluno não encontrado');
    }
    return aluno;
  } catch (error) {
    throw new Error(`Erro ao buscar aluno: ${error.message}`);
  }
};

const listarAlunosPorEducador = async (educadorId) => {
  try {
    const alunos = await getAlunosByEducador(educadorId);
    return alunos;
  } catch (error) {
    throw new Error(`Erro ao buscar alunos do educador: ${error.message}`);
  }
};

const buscarAlunosComFiltros = async (filters) => {
  try {
    const alunos = await findAlunosByFilters(filters);
    return alunos;
  } catch (error) {
    throw new Error(`Erro ao buscar alunos com filtros: ${error.message}`);
  }
};

const deletarAluno = async (id) => {
  try {
    const exists = await alunoExists(id);
    if (!exists) {
      throw new Error('Aluno não encontrado');
    }

    const aluno = await deleteAluno(id);
    return aluno;
  } catch (error) {
    throw new Error(`Erro ao deletar aluno: ${error.message}`);
  }
};

const adicionarAvaliacao = async (id, avaliacao) => {
  try {
    const aluno = await getAlunoById(id);
    if (!aluno) {
      throw new Error('Aluno não encontrado');
    }

    aluno.historicoAvaliacoes.push({
      data: avaliacao.data || new Date(),
      peso: avaliacao.peso,
      percentualGordura: avaliacao.percentualGordura,
      massaMuscular: avaliacao.massaMuscular,
      circunferencias: avaliacao.circunferencias,
    });

    await aluno.save();
    return aluno;
  } catch (error) {
    throw new Error(`Erro ao adicionar avaliação: ${error.message}`);
  }
};

const calcularEstatisticas = async (id) => {
  try {
    const aluno = await getAlunoById(id);
    if (!aluno) {
      throw new Error('Aluno não encontrado');
    }

    const avaliacoes = aluno.historicoAvaliacoes || [];
    const totalAvaliacoes = avaliacoes.length;

    if (totalAvaliacoes === 0) {
      return {
        totalAvaliacoes: 0,
        pesoAtual: aluno.dadosFisicos?.peso || null,
        imcAtual: aluno.dadosFisicos?.imc || null,
        progressoPeso: null,
      };
    }

    const primeiraAvaliacao = avaliacoes[0];
    const ultimaAvaliacao = avaliacoes[totalAvaliacoes - 1];

    const progressoPeso = ultimaAvaliacao.peso
      ? ((ultimaAvaliacao.peso - (primeiraAvaliacao.peso || aluno.dadosFisicos?.peso)) /
          (primeiraAvaliacao.peso || aluno.dadosFisicos?.peso)) *
        100
      : null;

    return {
      totalAvaliacoes,
      pesoAtual: aluno.dadosFisicos?.peso || null,
      imcAtual: aluno.dadosFisicos?.imc || null,
      progressoPeso: progressoPeso ? progressoPeso.toFixed(2) : null,
      primeiraAvaliacao: primeiraAvaliacao.data,
      ultimaAvaliacao: ultimaAvaliacao.data,
    };
  } catch (error) {
    throw new Error(`Erro ao calcular estatísticas: ${error.message}`);
  }
};

module.exports = {
  criarAluno,
  atualizarAluno,
  salvarAluno,
  listarAlunos,
  buscarAlunoPorId,
  listarAlunosPorEducador,
  buscarAlunosComFiltros,
  deletarAluno,
  adicionarAvaliacao,
  calcularEstatisticas,
};
