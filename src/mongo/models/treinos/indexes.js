function applyIndexes(schema) {
  schema.index({ criadoPor: 1 });
  schema.index({ nivel: 1 });
  schema.index({ objetivo: 1 });
  schema.index({ tags: 1 });
  schema.index({ nome: 'text', descricao: 'text' });
}

module.exports = applyIndexes;
