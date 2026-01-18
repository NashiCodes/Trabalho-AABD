function applyValidators(schema) {
  schema.pre('save', function (next) {
    if (this.isNew) {
      console.log(`Nova mensagem de ${this.remetenteTipo} para ${this.destinatarioTipo}`);
    }

    if (
      this.remetenteId.equals(this.destinatarioId) &&
      this.remetenteTipo === this.destinatarioTipo
    ) {
      return next(new Error('Remetente e destinatário não podem ser o mesmo usuário'));
    }

    if (this.lida && !this.dataLeitura) {
      this.dataLeitura = new Date();
    }

    next();
  });

  schema.post('save', function (doc) {
    console.log(`Mensagem salva com sucesso: ${doc._id}`);
  });

  schema.pre('validate', function (next) {
    if (this.conteudo && this.conteudo.length > 5000) {
      return next(new Error('Mensagem não pode ter mais de 5000 caracteres'));
    }

    if (this.lida === false && this.dataLeitura) {
      return next(new Error('Mensagem não lida não pode ter data de leitura'));
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
