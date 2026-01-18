function applyIndexes(schema) {
  schema.index({ especialidades: 1 });
}

module.exports = applyIndexes;
