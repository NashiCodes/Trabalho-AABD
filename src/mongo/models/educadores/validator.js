function applyValidators(schema) {
  schema.pre('save', async function () {
    if (this.isNew) {
      console.log(`Novo educador cadastrado: ${this.nome}`);
    }
  });

  schema.post('save', function (doc) {
    console.log(`Educador salvo com sucesso: ${doc._id}`);
  });

  schema.pre('validate', function () {
    if (this.contato?.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.contato.email)) {
        this.invalidate('contato.email', 'Email inválido');
      }
    }

    if (this.avaliacaoMedia !== undefined) {
      if (this.avaliacaoMedia < 0 || this.avaliacaoMedia > 5) {
        this.invalidate('avaliacaoMedia', 'Avaliação média deve estar entre 0 e 5');
      }
    }
  });

  schema.pre('findOneAndUpdate', function () {
    const update = this.getUpdate();
    if (update.$set?.['avaliacaoMedia']) {
      if (update.$set['avaliacaoMedia'] < 0 || update.$set['avaliacaoMedia'] > 5) {
        throw new Error('Avaliação média deve estar entre 0 e 5');
      }
    }
  });
}

module.exports = applyValidators;
