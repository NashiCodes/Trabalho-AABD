const {
  createNotificacao,
  updateNotificacao,
  getAllNotificacoes,
  getNotificacaoById,
  getNotificacoesByUsuario,
  getNotificacoesByTipo,
  findNotificacoesByFilters,
  marcarComoLida,
  marcarVariasComoLidas,
  marcarTodasComoLidas,
  countNotificacoesNaoLidas,
  deleteNotificacao,
  deleteNotificacoesAntigas,
  notificacaoExists,
} = require('@repositories/notificacaoRepository');

const criarNotificacao = async (notificacaoData) => {
  try {
    if (!notificacaoData.usuarioId) {
      throw new Error('Usuário é obrigatório');
    }

    if (!notificacaoData.tipo) {
      throw new Error('Tipo de notificação é obrigatório');
    }

    if (!notificacaoData.titulo || notificacaoData.titulo.trim().length === 0) {
      throw new Error('Título é obrigatório');
    }

    if (!notificacaoData.mensagem || notificacaoData.mensagem.trim().length === 0) {
      throw new Error('Mensagem é obrigatória');
    }

    const notificacao = await createNotificacao(notificacaoData);
    return notificacao;
  } catch (error) {
    throw new Error(`Erro ao criar notificação: ${error.message}`);
  }
};

const atualizarNotificacao = async (id, notificacaoData) => {
  try {
    const exists = await notificacaoExists(id);
    if (!exists) {
      throw new Error('Notificação não encontrada');
    }

    const notificacao = await updateNotificacao(id, notificacaoData);
    if (!notificacao) {
      throw new Error('Erro ao atualizar notificação');
    }

    return notificacao;
  } catch (error) {
    throw new Error(`Erro ao atualizar notificação: ${error.message}`);
  }
};

const listarNotificacoes = async (options = {}) => {
  try {
    const { page = 1, pageSize = 20, sort } = options;
    const skip = (page - 1) * pageSize;

    const notificacoes = await getAllNotificacoes({ limit: pageSize, skip, sort });

    return {
      notificacoes,
      page,
    };
  } catch (error) {
    throw new Error(`Erro ao listar notificações: ${error.message}`);
  }
};

const buscarNotificacaoPorId = async (id) => {
  try {
    const notificacao = await getNotificacaoById(id);
    if (!notificacao) {
      throw new Error('Notificação não encontrada');
    }
    return notificacao;
  } catch (error) {
    throw new Error(`Erro ao buscar notificação: ${error.message}`);
  }
};

const listarNotificacoesPorUsuario = async (usuarioId, options = {}) => {
  try {
    const notificacoes = await getNotificacoesByUsuario(usuarioId, options);
    return notificacoes;
  } catch (error) {
    throw new Error(`Erro ao buscar notificações do usuário: ${error.message}`);
  }
};

const listarNotificacoesPorTipo = async (usuarioId, tipo, options = {}) => {
  try {
    const notificacoes = await getNotificacoesByTipo(usuarioId, tipo, options);
    return notificacoes;
  } catch (error) {
    throw new Error(`Erro ao buscar notificações por tipo: ${error.message}`);
  }
};

const buscarNotificacoesComFiltros = async (filters) => {
  try {
    const notificacoes = await findNotificacoesByFilters(filters);
    return notificacoes;
  } catch (error) {
    throw new Error(`Erro ao buscar notificações com filtros: ${error.message}`);
  }
};

const lerNotificacao = async (id) => {
  try {
    const exists = await notificacaoExists(id);
    if (!exists) {
      throw new Error('Notificação não encontrada');
    }

    const notificacao = await marcarComoLida(id);
    return notificacao;
  } catch (error) {
    throw new Error(`Erro ao marcar notificação como lida: ${error.message}`);
  }
};

const lerVariasNotificacoes = async (notificacaoIds) => {
  try {
    if (!notificacaoIds || notificacaoIds.length === 0) {
      throw new Error('Lista de notificações é obrigatória');
    }

    const result = await marcarVariasComoLidas(notificacaoIds);
    return result;
  } catch (error) {
    throw new Error(`Erro ao marcar notificações como lidas: ${error.message}`);
  }
};

const lerTodasNotificacoes = async (usuarioId) => {
  try {
    const result = await marcarTodasComoLidas(usuarioId);
    return result;
  } catch (error) {
    throw new Error(`Erro ao marcar todas notificações como lidas: ${error.message}`);
  }
};

const contarNotificacoesNaoLidas = async (usuarioId) => {
  try {
    const count = await countNotificacoesNaoLidas(usuarioId);
    return count;
  } catch (error) {
    throw new Error(`Erro ao contar notificações não lidas: ${error.message}`);
  }
};

const deletarNotificacao = async (id) => {
  try {
    const exists = await notificacaoExists(id);
    if (!exists) {
      throw new Error('Notificação não encontrada');
    }

    const notificacao = await deleteNotificacao(id);
    return notificacao;
  } catch (error) {
    throw new Error(`Erro ao deletar notificação: ${error.message}`);
  }
};

const limparNotificacoesAntigas = async (diasAtras = 30) => {
  try {
    if (diasAtras < 1) {
      throw new Error('Período mínimo é de 1 dia');
    }

    const result = await deleteNotificacoesAntigas(diasAtras);
    return result;
  } catch (error) {
    throw new Error(`Erro ao limpar notificações antigas: ${error.message}`);
  }
};

const notificarUsuario = async (usuarioId, tipo, titulo, mensagem, link = null) => {
  try {
    const notificacaoData = {
      usuarioId,
      usuarioTipo: 'Aluno',
      tipo,
      titulo,
      mensagem,
      link,
    };

    return await criarNotificacao(notificacaoData);
  } catch (error) {
    throw new Error(`Erro ao notificar usuário: ${error.message}`);
  }
};

module.exports = {
  criarNotificacao,
  atualizarNotificacao,
  listarNotificacoes,
  buscarNotificacaoPorId,
  listarNotificacoesPorUsuario,
  listarNotificacoesPorTipo,
  buscarNotificacoesComFiltros,
  lerNotificacao,
  lerVariasNotificacoes,
  lerTodasNotificacoes,
  contarNotificacoesNaoLidas,
  deletarNotificacao,
  limparNotificacoesAntigas,
  notificarUsuario,
};
