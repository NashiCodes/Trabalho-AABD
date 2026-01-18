const applyIndexes = (schema) => {
  schema.index({ educadorId: 1 });
  schema.index({ nivel: 1 });
  schema.index({ objetivos: 1 });
};

module.exports = { applyIndexes };
