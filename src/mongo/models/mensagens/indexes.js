function applyIndexes(schema) {
  schema.index({ destinatarioId: 1, lida: 1, dataHora: -1 });
  schema.index({ remetenteId: 1, dataHora: -1 });
}

module.exports = applyIndexes;
