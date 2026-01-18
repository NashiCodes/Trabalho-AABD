const Educador = require('../educadores');

function applyValidators(schema) {
  schema.pre('save', async function (next) {
    if (this.isNew) {
      console.log(`Nova avaliação para educador: ${this.educadorId}`);

      try {
        const Avaliacao = this.constructor;
        const avaliacoes = await Avaliacao.find({ educadorId: this.educadorId });
        const totalNotas = avaliacoes.reduce((sum, av) => sum + av.nota, 0) + this.nota;
        const novaMedia = totalNotas / (avaliacoes.length + 1);

        await Educador.findByIdAndUpdate(this.educadorId, {
          avaliacaoMedia: parseFloat(novaMedia.toFixed(2)),
        });
      } catch (error) {
        console.error('Erro ao atualizar média do educador:', error);
      }
    }
    next();
  });

  schema.post('save', function (doc) {
    console.log(`Avaliação salva com sucesso: ${doc._id}`);
  });

  schema.pre('validate', async function () {
    if (this.nota < 1 || this.nota > 5) {
      throw new Error('Nota deve estar entre 1 e 5');
    }

    if (this.comentario && this.comentario.length > 1000) {
      throw new Error('Comentário não pode ter mais de 1000 caracteres');
    }
  });

  schema.post('findOneAndDelete', async function (doc) {
    if (doc) {
      try {
        const Avaliacao = doc.constructor;
        const avaliacoes = await Avaliacao.find({ educadorId: doc.educadorId });

        if (avaliacoes.length === 0) {
          await Educador.findByIdAndUpdate(doc.educadorId, { avaliacaoMedia: 0 });
        } else {
          const totalNotas = avaliacoes.reduce((sum, av) => sum + av.nota, 0);
          const novaMedia = totalNotas / avaliacoes.length;
          await Educador.findByIdAndUpdate(doc.educadorId, {
            avaliacaoMedia: parseFloat(novaMedia.toFixed(2)),
          });
        }
      } catch (error) {
        console.error('Erro ao recalcular média do educador:', error);
      }
    }
  });
}

module.exports = applyValidators;
