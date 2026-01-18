function applyValidators(schema) {
  schema.pre('save', function (next) {
    if (this.isNew) {
      console.log(`Novo educador cadastrado: ${this.nome}`);
    }
    next();
  });

  schema.post('save', function (doc) {
    console.log(`Educador salvo com sucesso: ${doc._id}`);
  });

  schema.pre('validate', function (next) {
    if (this.contato?.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.contato.email)) {
        return next(new Error('Email inválido'));
      }
    }

    if (this.avaliacaoMedia !== undefined) {
      if (this.avaliacaoMedia < 0 || this.avaliacaoMedia > 5) {
        return next(new Error('Avaliação média deve estar entre 0 e 5'));
      }
    }

    next();
  });

  schema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();
    if (update.$set?.['avaliacaoMedia']) {
      if (update.$set['avaliacaoMedia'] < 0 || update.$set['avaliacaoMedia'] > 5) {
        return next(new Error('Avaliação média deve estar entre 0 e 5'));
      }
    }
    next();
  });
}

module.exports = applyValidators;
