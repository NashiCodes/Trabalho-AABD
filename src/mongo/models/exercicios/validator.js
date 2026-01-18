function applyValidators(schema) {
  schema.pre('save', async function () {
    if (this.isNew) {
      console.log(`Novo exercício cadastrado: ${this.nome}`);
    }
  });

  schema.post('save', function (doc) {
    console.log(`Exercício salvo com sucesso: ${doc._id}`);
  });

  schema.pre('validate', async function () {
    if (this.grupoMuscular && this.grupoMuscular.length === 0) {
      throw new Error('Pelo menos um grupo muscular deve ser especificado');
    }

    if (this.videoUrl) {
      const urlRegex = /^https?:\/\/.+/;
      if (!urlRegex.test(this.videoUrl)) {
        throw new Error('URL do vídeo inválida');
      }
    }
  });

  schema.pre('findOneAndUpdate', async function () {
    const update = this.getUpdate();
    if (update.$set?.grupoMuscular && update.$set.grupoMuscular.length === 0) {
      throw new Error('Pelo menos um grupo muscular deve ser especificado');
    }
  });
}

module.exports = applyValidators;
