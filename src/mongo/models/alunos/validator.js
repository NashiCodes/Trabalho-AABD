const applyValidators = (schema) => {
  // PRE-SAVE - executa antes de criar ou atualizar
  schema.pre('save', function () {
    // Calcular IMC automaticamente
    if (this.dadosFisicos.peso && this.dadosFisicos.altura) {
      const imc = this.dadosFisicos.peso / Math.pow(this.dadosFisicos.altura, 2);
      this.dadosFisicos.imc = Math.round(imc * 100) / 100; // arredonda para 2 casas
    }

    // Normalizar dados pessoais
    if (this.dadosPessoais.email) {
      this.dadosPessoais.email = this.dadosPessoais.email.toLowerCase().trim();
    }

    // Garantir nivel padrão
    if (!this.nivel) {
      this.nivel = 'Iniciante';
    }

    // Normalizar arrays
    if (this.objetivos && this.objetivos.length === 0) {
      this.objetivos = [];
    }
    if (this.restricoesMedicas && this.restricoesMedicas.length === 0) {
      this.restricoesMedicas = [];
    }
  });

  // PRE-VALIDATE - executa antes da validação
  schema.pre('validate', function () {
    // Validações customizadas de negócio
    if (this.dadosFisicos?.peso && this.dadosFisicos.peso < 20) {
      throw new Error('Peso deve ser maior que 20kg');
    }

    if (
      this.dadosFisicos?.altura &&
      (this.dadosFisicos.altura < 0.5 || this.dadosFisicos.altura > 3)
    ) {
      throw new Error('Altura deve estar entre 0.5m e 3m');
    }

    // Validar idade mínima (13 anos)
    if (this.dadosPessoais?.dataNascimento) {
      const idade =
        new Date().getFullYear() - new Date(this.dadosPessoais.dataNascimento).getFullYear();
      if (idade < 13) {
        throw new Error('Aluno deve ter no mínimo 13 anos');
      }
    }
  });

  // POST-SAVE - executa depois de salvar
  schema.post('save', function (doc) {
    console.log(`✅ Aluno ${doc.nome} foi salvo (ID: ${doc._id})`);
    // Aqui você pode adicionar:
    // - Enviar email de boas-vindas
    // - Notificar educador
    // - Registrar log de auditoria
  });

  // PRE-UPDATE - executa antes de atualizar
  schema.pre('findOneAndUpdate', function () {
    const update = this.getUpdate();

    // Recalcular IMC se peso ou altura mudaram
    if (update.dadosFisicos) {
      const { peso, altura } = update.dadosFisicos;
      if (peso && altura) {
        const imc = peso / Math.pow(altura, 2);
        update.dadosFisicos.imc = Math.round(imc * 100) / 100;
      }
    }

    // Normalizar email em updates
    if (update.dadosPessoais?.email) {
      update.dadosPessoais.email = update.dadosPessoais.email.toLowerCase().trim();
    }
  });

  // POST-UPDATE - executa depois de atualizar
  schema.post('findOneAndUpdate', function (doc) {
    if (doc) {
      console.log(`✏️ Aluno ${doc.nome} foi atualizado`);
    }
  });
  // POST-REMOVE - executa depois de deletar
  schema.post('findOneAndDelete', function (doc) {
    if (doc) {
      console.log(`🗑️ Aluno ${doc.nome} foi removido`);
      // Aqui você pode adicionar:
      // - Remover dados relacionados
      // - Notificar educador
      // - Arquivar dados
    }
  });
};

module.exports = { applyValidators };
