function applyIndexes(schema) {
  schema.index({ alunoId: 1, dataHora: -1 });
  schema.index({ treinoId: 1 });
  schema.index({ dataHora: -1 });
  schema.index({ concluido: 1 });
}

module.exports = applyIndexes;
