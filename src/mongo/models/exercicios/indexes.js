function applyIndexes(schema) {
  schema.index({ grupoMuscular: 1 });
  schema.index({ tipo: 1 });
  schema.index({ nivelDificuldade: 1 });
  schema.index({ equipamento: 1 });
}

module.exports = applyIndexes;
