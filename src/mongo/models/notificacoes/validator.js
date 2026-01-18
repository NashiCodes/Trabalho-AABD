function applyValidators(schema) {
  schema.pre('save', function (next) {
    if (this.isNew) {
      console.log(`Nova notificação criada para ${this.usuarioTipo}: ${this.titulo}`);
    }

    if (this.lida && !this.dataLeitura) {
      this.dataLeitura = new Date();
    }

    next();
  });

  schema.post('save', function (doc) {
    console.log(`Notificação salva com sucesso: ${doc._id}`);
  });

  schema.pre('validate', function (next) {
    if (this.titulo && this.titulo.length > 200) {
      return next(new Error('Título não pode ter mais de 200 caracteres'));
    }

    if (this.mensagem && this.mensagem.length > 1000) {
      return next(new Error('Mensagem não pode ter mais de 1000 caracteres'));
    }

    if (this.lida === false && this.dataLeitura) {
      return next(new Error('Notificação não lida não pode ter data de leitura'));
    }

    if (this.link) {
      if (!this.link.startsWith('/') && !this.link.startsWith('http')) {
        return next(new Error('Link deve ser um caminho válido ou URL'));
      }
    }

    next();
  });

  schema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();

    if (update.$set?.lida === true && !update.$set?.dataLeitura) {
      update.$set.dataLeitura = new Date();
    }

    next();
  });
}

module.exports = applyValidators;
