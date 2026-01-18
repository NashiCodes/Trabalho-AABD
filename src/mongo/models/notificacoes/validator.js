function applyValidators(schema) {
  schema.pre('save', async function () {
    if (this.isNew) {
      console.log(`Nova notificação criada para ${this.usuarioTipo}: ${this.titulo}`);
    }

    if (this.lida && !this.dataLeitura) {
      this.dataLeitura = new Date();
    }
  });

  schema.post('save', function (doc) {
    console.log(`Notificação salva com sucesso: ${doc._id}`);
  });

  schema.pre('validate', async function () {
    if (this.titulo && this.titulo.length > 200) {
      throw new Error('Título não pode ter mais de 200 caracteres');
    }

    if (this.mensagem && this.mensagem.length > 1000) {
      throw new Error('Mensagem não pode ter mais de 1000 caracteres');
    }

    if (this.lida === false && this.dataLeitura) {
      throw new Error('Notificação não lida não pode ter data de leitura');
    }

    if (this.link) {
      if (!this.link.startsWith('/') && !this.link.startsWith('http')) {
        throw new Error('Link deve ser um caminho válido ou URL');
      }
    }
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
