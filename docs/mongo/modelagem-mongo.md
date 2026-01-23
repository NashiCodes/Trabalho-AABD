# Modelagem do Banco de Dados MongoDB

## Modelos

### Collection: educadores

```json
{
  "_id": ObjectId,
  "nome": String,
  "cref": String,
  "especialidades": [String],
  "contato": {
    "email": String,
    "telefone": String
  },
  "dataCadastro": Date,
  "alunosAtivos": Number,
  "avaliacaoMedia": Number
}
```

### Collection: alunos

```json
{
  "_id": ObjectId,
  "nome": String,
  "educadorId": ObjectId,
  "dadosPessoais": {
    "email": String,
    "telefone": String,
    "dataNascimento": Date,
    "genero": String
  },
  "dadosFisicos": {
    "peso": Number,
    "altura": Number,
    "imc": Number
  },
  "objetivos": [String],
  "nivel": String,
  "restricoesMedicas": [String],
  "historicoAvaliacoes": [
    {
      "data": Date,
      "peso": Number,
      "percentualGordura": Number,
      "massaMuscular": Number,
      "circunferencias": {
        "braco": Number,
        "perna": Number,
        "cintura": Number
      }
    }
  ]
}
```

### Collection: treinos

```json
{
  "_id": ObjectId,
  "nome": String,
  "criadoPor": ObjectId,
  "descricao": String,
  "nivel": String,
  "objetivo": String,
  "duracaoEstimada": Number,
  "caloriasEstimadas": Number,
  "exercicios": [
    {
      "exercicioId": ObjectId,
      "nome": String,
      "series": Number,
      "repeticoes": String,
      "carga": String,
      "descanso": Number,
      "ordem": Number,
      "observacoes": String
    }
  ],
  "tags": [String]
}
```

### Collection: exercicios

```json
{
  "_id": ObjectId,
  "nome": String,
  "grupoMuscular": [String],
  "tipo": String,
  "equipamento": [String],
  "descricaoTecnica": String,
  "nivelDificuldade": String,
  "videoUrl": String,
  "calorias100kg": Number
}
```

### Collection: execucoes

```json
{
  "_id": ObjectId,
  "alunoId": ObjectId,
  "treinoId": ObjectId,
  "dataHora": Date,
  "duracaoReal": Number,
  "caloriasQueimadas": Number,
  "feedbackAluno": String,
  "dificuldadePercebida": Number,
  "exerciciosRealizados": [
    {
      "exercicioId": ObjectId,
      "seriesRealizadas": Number,
      "cargaUtilizada": Number,
      "observacoes": String
    }
  ],
  "concluido": Boolean
}
```

### Collection: mensagens

```json
{
  "_id": ObjectId,
  "remetenteId": ObjectId,
  "remetenteTipo": String,
  "destinatarioId": ObjectId,
  "destinatarioTipo": String,
  "assunto": String,
  "conteudo": String,
  "dataHora": Date,
  "lida": Boolean,
  "dataLeitura": Date,
  "arquivosAnexos": [
    {
      "nome": String,
      "url": String,
      "tipo": String
    }
  ]
}
```

### Collection: avaliacoes

```json
{
  "_id": ObjectId,
  "alunoId": ObjectId,
  "educadorId": ObjectId,
  "nota": Number,
  "comentario": String,
  "dataAvaliacao": Date
}
```

### Collection: notificacoes

```json
{
  "_id": ObjectId,
  "usuarioId": ObjectId,
  "usuarioTipo": String,
  "tipo": String,
  "titulo": String,
  "mensagem": String,
  "lida": Boolean,
  "dataCriacao": Date,
  "dataLeitura": Date,
  "link": String
}
```

## Índices

### educadores

**Índices automáticos (Mongoose):**

- `_id`: Índice único criado automaticamente
- `cref`: Índice único (definido como `unique: true` no schema)
- `contato.email`: Índice único (definido como `unique: true` no schema)

**[Índices criados](src/mongo/models/educadores/indexes.js):**

- `especialidades`: Busca por especialidades do educador

  ```javascript
  educadorSchema.index({ especialidades: 1 });
  ```

### alunos

**Índices automáticos (Mongoose):**

- `_id`: Índice único criado automaticamente
- `dadosPessoais.email`: Índice único (definido como `unique: true` no schema)

**[Índices criados](src/mongo/models/alunos/indexes.js):**

- `educadorId`: Busca rápida de alunos por educador
- `nivel`: Filtragem por nível do aluno
- `objetivos`: Busca por objetivos do aluno

  ```javascript
  alunoSchema.index({ educadorId: 1 });
  alunoSchema.index({ nivel: 1 });
  alunoSchema.index({ objetivos: 1 });
  ```

### treinos

**Índices automáticos (Mongoose):**

- `_id`: Índice único criado automaticamente

**[Índices criados](src/mongo/models/treinos/indexes.js):**

- `criadoPor`: Busca de treinos por educador criador
- `nivel`: Filtragem por nível de dificuldade
- `objetivo`: Filtragem por objetivo do treino
- `tags`: Busca por tags
- `nome, descricao`: Índice de texto completo para pesquisa

  ```javascript
  treinoSchema.index({ criadoPor: 1 });
  treinoSchema.index({ nivel: 1 });
  treinoSchema.index({ objetivo: 1 });
  treinoSchema.index({ tags: 1 });
  treinoSchema.index({ nome: 'text', descricao: 'text' });
  ```

### exercicios

**Índices automáticos (Mongoose):**

- `_id`: Índice único criado automaticamente
- `nome`: Índice único (definido como `unique: true` no schema)

**[Índices criados](src/mongo/models/exercicios/indexes.js):**

- `grupoMuscular`: Busca por grupo muscular
- `tipo`: Filtragem por tipo de exercício
- `nivelDificuldade`: Filtragem por nível de dificuldade
- `equipamento`: Busca por equipamento necessário

  ```javascript
  exercicioSchema.index({ grupoMuscular: 1 });
  exercicioSchema.index({ tipo: 1 });
  exercicioSchema.index({ nivelDificuldade: 1 });
  exercicioSchema.index({ equipamento: 1 });
  ```

### execucoes

**Índices automáticos (Mongoose):**

- `_id`: Índice único criado automaticamente

**[Índices criados](src/mongo/models/execucoes/indexes.js):**

- `alunoId, dataHora`: Índice composto para histórico de execuções por aluno
- `treinoId`: Busca de execuções por treino
- `dataHora`: Ordenação por data
- `concluido`: Filtragem por status de conclusão

  ```javascript
  execucaoSchema.index({ alunoId: 1, dataHora: -1 });
  execucaoSchema.index({ treinoId: 1 });
  execucaoSchema.index({ dataHora: -1 });
  execucaoSchema.index({ concluido: 1 });
  ```

### mensagens

**Índices automáticos (Mongoose):**

- `_id`: Índice único criado automaticamente

**[Índices criados](src/mongo/models/mensagens/indexes.js):**

- `destinatarioId, lida, dataHora`: Índice composto para caixa de entrada
- `remetenteId, dataHora`: Índice composto para mensagens enviadas

  ```javascript
  mensagemSchema.index({ destinatarioId: 1, lida: 1, dataHora: -1 });
  mensagemSchema.index({ remetenteId: 1, dataHora: -1 });
  ```

### avaliacoes

**Índices automáticos (Mongoose):**

- `_id`: Índice único criado automaticamente

**[Índices criados](src/mongo/models/avaliacoes/indexes.js):**

- `educadorId`: Busca de avaliações por educador
- `alunoId`: Busca de avaliações por aluno
- `dataAvaliacao`: Ordenação por data de avaliação

  ```javascript
  avaliacaoSchema.index({ educadorId: 1 });
  avaliacaoSchema.index({ alunoId: 1 });
  avaliacaoSchema.index({ dataAvaliacao: -1 });
  ```

### notificacoes

**Índices automáticos (Mongoose):**

- `_id`: Índice único criado automaticamente

**[Índices criados](src/mongo/models/notificacoes/indexes.js):**

- `usuarioId, lida, dataCriacao`: Índice composto para notificações do usuário
- `tipo`: Filtragem por tipo de notificação

  ```javascript
  notificacaoSchema.index({ usuarioId: 1, lida: 1, dataCriacao: -1 });
  notificacaoSchema.index({ tipo: 1 });
  ```

## Relacionamentos

1. **Educadores ↔ Alunos**: Um educador pode ter vários alunos (1:N)
2. **Educadores ↔ Treinos**: Um educador cria vários treinos (1:N)
3. **Alunos ↔ Treinos**: Um aluno pode ter vários treinos (1:N)
4. **Treinos ↔ Execuções**: Um treino pode ter várias execuções (1:N)
5. **Alunos ↔ Progresso**: Um aluno tem várias medidas de progresso (1:N)
6. **Educadores ↔ Alunos (Mensagens)**: Comunicação bidirecional (N:N)
7. **Educadores ↔ Avaliações**: Um educador pode ter várias avaliações (1:N)
