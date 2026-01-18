function applyValidators(schema) {
  schema.pre('save', function (next) {
    if (this.isNew) {
      console.log(`Novo treino criado: ${this.nome}`);
    }

    if (this.exercicios && this.exercicios.length > 0) {
      const ordens = this.exercicios.map((ex) => ex.ordem);
      const ordensUnicas = new Set(ordens);
      if (ordens.length !== ordensUnicas.size) {
        return next(new Error('Exercícios devem ter ordens únicas'));
      }
    }

    next();
  });

  schema.post('save', function (doc) {
    console.log(`Treino salvo com sucesso: ${doc._id}`);
  });

  schema.pre('validate', function (next) {
    if (this.exercicios && this.exercicios.length === 0) {
      return next(new Error('Um treino deve ter pelo menos um exercício'));
    }

    if (this.duracaoEstimada !== undefined && this.duracaoEstimada < 0) {
      return next(new Error('Duração estimada não pode ser negativa'));
    }

    if (this.caloriasEstimadas !== undefined && this.caloriasEstimadas < 0) {
      return next(new Error('Calorias estimadas não podem ser negativas'));
    }

    next();
  });

  schema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();

    if (update.$set?.exercicios && update.$set.exercicios.length === 0) {
      return next(new Error('Um treino deve ter pelo menos um exercício'));
    }

    if (update.$set?.exercicios && update.$set.exercicios.length > 0) {
      const ordens = update.$set.exercicios.map((ex) => ex.ordem);
      const ordensUnicas = new Set(ordens);
      if (ordens.length !== ordensUnicas.size) {
        return next(new Error('Exercícios devem ter ordens únicas'));
      }
    }

    next();
  });
}

module.exports = applyValidators;
