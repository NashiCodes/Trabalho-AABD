function applyIndexes(schema) {
  schema.index({ usuarioId: 1, lida: 1, dataCriacao: -1 });
  schema.index({ tipo: 1 });
}

module.exports = applyIndexes;
