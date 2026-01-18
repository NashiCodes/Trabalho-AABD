const {
  createMensagem,
  updateMensagem,
  getAllMensagens,
  getMensagemById,
  getMensagensByUsuario,
  getMensagensRecebidas,
  getMensagensEnviadas,
  marcarComoLida,
  marcarVariasComoLidas,
  countMensagensNaoLidas,
  deleteMensagem,
  mensagemExists,
} = require('@repositories/mensagemRepository');

const criarMensagem = async (mensagemData) => {
  try {
    if (!mensagemData.remetenteId) {
      throw new Error('Remetente é obrigatório');
    }

    if (!mensagemData.destinatarioId) {
      throw new Error('Destinatário é obrigatório');
    }

    if (!mensagemData.conteudo || mensagemData.conteudo.trim().length === 0) {
      throw new Error('Conteúdo da mensagem é obrigatório');
    }

    const mensagem = await createMensagem(mensagemData);
    return mensagem;
  } catch (error) {
    throw new Error(`Erro ao criar mensagem: ${error.message}`);
  }
};

const atualizarMensagem = async (id, mensagemData) => {
  try {
    const exists = await mensagemExists(id);
    if (!exists) {
      throw new Error('Mensagem não encontrada');
    }

    const mensagem = await updateMensagem(id, mensagemData);
    if (!mensagem) {
      throw new Error('Erro ao atualizar mensagem');
    }

    return mensagem;
  } catch (error) {
    throw new Error(`Erro ao atualizar mensagem: ${error.message}`);
  }
};

const listarMensagens = async (options = {}) => {
  try {
    const { page = 1, pageSize = 20, sort } = options;
    const skip = (page - 1) * pageSize;

    const mensagens = await getAllMensagens({ limit: pageSize, skip, sort });

    return {
      mensagens,
      page,
    };
  } catch (error) {
    throw new Error(`Erro ao listar mensagens: ${error.message}`);
  }
};

const buscarMensagemPorId = async (id) => {
  try {
    const mensagem = await getMensagemById(id);
    if (!mensagem) {
      throw new Error('Mensagem não encontrada');
    }
    return mensagem;
  } catch (error) {
    throw new Error(`Erro ao buscar mensagem: ${error.message}`);
  }
};

const listarMensagensPorUsuario = async (usuarioId, options = {}) => {
  try {
    const mensagens = await getMensagensByUsuario(usuarioId, options);
    return mensagens;
  } catch (error) {
    throw new Error(`Erro ao buscar mensagens do usuário: ${error.message}`);
  }
};

const listarMensagensRecebidas = async (usuarioId, options = {}) => {
  try {
    const mensagens = await getMensagensRecebidas(usuarioId, options);
    return mensagens;
  } catch (error) {
    throw new Error(`Erro ao buscar mensagens recebidas: ${error.message}`);
  }
};

const listarMensagensEnviadas = async (usuarioId, options = {}) => {
  try {
    const mensagens = await getMensagensEnviadas(usuarioId, options);
    return mensagens;
  } catch (error) {
    throw new Error(`Erro ao buscar mensagens enviadas: ${error.message}`);
  }
};

const lerMensagem = async (id) => {
  try {
    const exists = await mensagemExists(id);
    if (!exists) {
      throw new Error('Mensagem não encontrada');
    }

    const mensagem = await marcarComoLida(id);
    return mensagem;
  } catch (error) {
    throw new Error(`Erro ao marcar mensagem como lida: ${error.message}`);
  }
};

const lerVariasMensagens = async (mensagemIds) => {
  try {
    if (!mensagemIds || mensagemIds.length === 0) {
      throw new Error('Lista de mensagens é obrigatória');
    }

    const result = await marcarVariasComoLidas(mensagemIds);
    return result;
  } catch (error) {
    throw new Error(`Erro ao marcar mensagens como lidas: ${error.message}`);
  }
};

const contarMensagensNaoLidas = async (usuarioId) => {
  try {
    const count = await countMensagensNaoLidas(usuarioId);
    return count;
  } catch (error) {
    throw new Error(`Erro ao contar mensagens não lidas: ${error.message}`);
  }
};

const deletarMensagem = async (id) => {
  try {
    const exists = await mensagemExists(id);
    if (!exists) {
      throw new Error('Mensagem não encontrada');
    }

    const mensagem = await deleteMensagem(id);
    return mensagem;
  } catch (error) {
    throw new Error(`Erro ao deletar mensagem: ${error.message}`);
  }
};

const enviarMensagem = async (mensagemData) => {
  try {
    if (mensagemData.remetenteId === mensagemData.destinatarioId) {
      throw new Error('Não é possível enviar mensagem para si mesmo');
    }

    return await criarMensagem(mensagemData);
  } catch (error) {
    throw new Error(`Erro ao enviar mensagem: ${error.message}`);
  }
};

module.exports = {
  criarMensagem,
  atualizarMensagem,
  listarMensagens,
  buscarMensagemPorId,
  listarMensagensPorUsuario,
  listarMensagensRecebidas,
  listarMensagensEnviadas,
  lerMensagem,
  lerVariasMensagens,
  contarMensagensNaoLidas,
  deletarMensagem,
  enviarMensagem,
};
