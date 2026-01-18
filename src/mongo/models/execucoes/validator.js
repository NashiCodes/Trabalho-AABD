function applyValidators(schema) {
  schema.pre('save', async function () {
    if (this.isNew) {
      console.log(`Nova execução registrada para aluno: ${this.alunoId}`);
    }

    if (this.exerciciosRealizados && this.exerciciosRealizados.length === 0 && this.concluido) {
      throw new Error('Uma execução concluída deve ter pelo menos um exercício realizado');
    }
  });

  schema.post('save', function (doc) {
    console.log(`Execução salva com sucesso: ${doc._id}`);
  });

  schema.pre('validate', async function () {
    if (this.dificuldadePercebida !== undefined) {
      if (this.dificuldadePercebida < 1 || this.dificuldadePercebida > 10) {
        throw new Error('Dificuldade percebida deve estar entre 1 e 10');
      }
    }

    if (this.duracaoReal !== undefined && this.duracaoReal < 0) {
      throw new Error('Duração real não pode ser negativa');
    }

    if (this.caloriasQueimadas !== undefined && this.caloriasQueimadas < 0) {
      throw new Error('Calorias queimadas não podem ser negativas');
    }
  });

  schema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();

    if (update.$set?.dificuldadePercebida) {
      if (update.$set.dificuldadePercebida < 1 || update.$set.dificuldadePercebida > 10) {
        return next(new Error('Dificuldade percebida deve estar entre 1 e 10'));
      }
    }

    next();
  });
}

module.exports = applyValidators;
