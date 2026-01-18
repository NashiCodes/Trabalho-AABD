function applyValidators(schema) {
  schema.pre('save', function (next) {
    if (this.isNew) {
      console.log(`Novo exercício cadastrado: ${this.nome}`);
    }
    next();
  });

  schema.post('save', function (doc) {
    console.log(`Exercício salvo com sucesso: ${doc._id}`);
  });

  schema.pre('validate', function (next) {
    if (this.grupoMuscular && this.grupoMuscular.length === 0) {
      return next(new Error('Pelo menos um grupo muscular deve ser especificado'));
    }

    if (this.videoUrl) {
      const urlRegex = /^https?:\/\/.+/;
      if (!urlRegex.test(this.videoUrl)) {
        return next(new Error('URL do vídeo inválida'));
      }
    }

    next();
  });

  schema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();
    if (update.$set?.grupoMuscular && update.$set.grupoMuscular.length === 0) {
      return next(new Error('Pelo menos um grupo muscular deve ser especificado'));
    }
    next();
  });
}

module.exports = applyValidators;
