function applyIndexes(schema) {
  schema.index({ educadorId: 1 });
  schema.index({ alunoId: 1 });
  schema.index({ dataAvaliacao: -1 });
}

module.exports = applyIndexes;
