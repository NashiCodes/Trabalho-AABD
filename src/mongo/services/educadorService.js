const {
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
} = require('@repositories/educadorRepository');

const criarEducador = async (educadorData) => {
  try {
    if (!educadorData.cref) {
      throw new Error('CREF é obrigatório');
    }

    const crefExistente = await getEducadorByCref(educadorData.cref);
    if (crefExistente) {
      throw new Error('CREF já cadastrado');
    }

    const educador = await createEducador(educadorData);
    return educador;
  } catch (error) {
    throw new Error(`Erro ao criar educador: ${error.message}`);
  }
};

const atualizarEducador = async (id, educadorData) => {
  try {
    const exists = await educadorExists(id);
    if (!exists) {
      throw new Error('Educador não encontrado');
    }

    if (educadorData.cref) {
      const crefExistente = await getEducadorByCref(educadorData.cref);
      if (crefExistente && crefExistente._id.toString() !== id) {
        throw new Error('CREF já cadastrado para outro educador');
      }
    }

    const educador = await updateEducador(id, educadorData);
    if (!educador) {
      throw new Error('Erro ao atualizar educador');
    }

    return educador;
  } catch (error) {
    throw new Error(`Erro ao atualizar educador: ${error.message}`);
  }
};

const salvarEducador = async (id, educadorData) => {
  if (!id) {
    return await criarEducador(educadorData);
  } else {
    return await atualizarEducador(id, educadorData);
  }
};

const listarEducadores = async (options = {}) => {
  try {
    const { page = 1, pageSize = 10, sort } = options;
    const skip = (page - 1) * pageSize;

    const [educadores, total] = await Promise.all([
      getAllEducadores({ limit: pageSize, skip, sort }),
      countEducadores(),
    ]);

    return {
      educadores,
      total,
      page,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (error) {
    throw new Error(`Erro ao listar educadores: ${error.message}`);
  }
};

const buscarEducadorPorId = async (id) => {
  try {
    const educador = await getEducadorById(id);
    if (!educador) {
      throw new Error('Educador não encontrado');
    }
    return educador;
  } catch (error) {
    throw new Error(`Erro ao buscar educador: ${error.message}`);
  }
};

const buscarEducadorPorCref = async (cref) => {
  try {
    const educador = await getEducadorByCref(cref);
    if (!educador) {
      throw new Error('Educador não encontrado');
    }
    return educador;
  } catch (error) {
    throw new Error(`Erro ao buscar educador por CREF: ${error.message}`);
  }
};

const buscarEducadoresComFiltros = async (filters) => {
  try {
    const educadores = await findEducadoresByFilters(filters);
    return educadores;
  } catch (error) {
    throw new Error(`Erro ao buscar educadores com filtros: ${error.message}`);
  }
};

const deletarEducador = async (id) => {
  try {
    const exists = await educadorExists(id);
    if (!exists) {
      throw new Error('Educador não encontrado');
    }

    const educador = await getEducadorById(id);
    if (educador.alunosAtivos > 0) {
      throw new Error('Não é possível deletar educador com alunos ativos');
    }

    await deleteEducador(id);
    return educador;
  } catch (error) {
    throw new Error(`Erro ao deletar educador: ${error.message}`);
  }
};

const adicionarAluno = async (id) => {
  try {
    const educador = await incrementarAlunosAtivos(id);
    if (!educador) {
      throw new Error('Educador não encontrado');
    }
    return educador;
  } catch (error) {
    throw new Error(`Erro ao adicionar aluno: ${error.message}`);
  }
};

const removerAluno = async (id) => {
  try {
    const educador = await decrementarAlunosAtivos(id);
    if (!educador) {
      throw new Error('Educador não encontrado');
    }
    return educador;
  } catch (error) {
    throw new Error(`Erro ao remover aluno: ${error.message}`);
  }
};

module.exports = {
  criarEducador,
  atualizarEducador,
  salvarEducador,
  listarEducadores,
  buscarEducadorPorId,
  buscarEducadorPorCref,
  buscarEducadoresComFiltros,
  deletarEducador,
  adicionarAluno,
  removerAluno,
};
