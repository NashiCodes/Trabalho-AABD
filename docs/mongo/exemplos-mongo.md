# Exemplos de Documentos - Mongo Fit

## Collection: educadores

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "nome": "Ana Silva",
  "cref": "12345",
  "especialidades": ["Musculação", "Funcional"],
  "contato": {
    "email": "ana@email.com",
    "telefone": "(32) 99999-0001"
  },
  "dataCadastro": ISODate("2024-01-15T10:00:00Z"),
  "alunosAtivos": 15,
  "avaliacaoMedia": 4.8
}
```

## Collection: alunos

```json
{
  "_id": ObjectId("507f191e810c19729de860ea"),
  "nome": "João Pedro",
  "educadorId": ObjectId("507f1f77bcf86cd799439011"),
  "dadosPessoais": {
    "email": "joao@email.com",
    "telefone": "(32) 99999-1001",
    "dataNascimento": ISODate("1995-03-20T00:00:00Z"),
    "genero": "M"
  },
  "dadosFisicos": {
    "peso": 75,
    "altura": 1.75,
    "imc": 24.5
  },
  "objetivos": ["Hipertrofia", "Ganho de Massa"],
  "nivel": "Iniciante",
  "restricoesMedicas": [],
  "historicoAvaliacoes": [
    {
      "data": ISODate("2024-06-01T09:00:00Z"),
      "peso": 75,
      "percentualGordura": 18,
      "massaMuscular": 32,
      "circunferencias": {
        "braco": 35,
        "perna": 58,
        "cintura": 85
      }
    }
  ]
}
```

## Collection: treinos

```json
{
  "_id": ObjectId("65a1b2c3d4e5f6a7b8c9d0e1"),
  "nome": "Treino A - Peito e Tríceps",
  "criadoPor": ObjectId("507f1f77bcf86cd799439011"),
  "descricao": "Treino focado em peitorais e tríceps",
  "nivel": "Intermediário",
  "objetivo": "Hipertrofia",
  "duracaoEstimada": 60,
  "caloriasEstimadas": 350,
  "exercicios": [
    {
      "exercicioId": ObjectId("65a1b2c3d4e5f6a7b8c9d0e2"),
      "nome": "Supino Reto",
      "series": 4,
      "repeticoes": "10-12",
      "carga": "a definir",
      "descanso": 90,
      "ordem": 1,
      "observacoes": "Controlar a descida"
    }
  ],
  "tags": ["peito", "triceps", "hipertrofia"]
}
```

## Collection: exercicios

```json
{
  "_id": ObjectId("65a1b2c3d4e5f6a7b8c9d0e2"),
  "nome": "Supino Reto",
  "grupoMuscular": ["Peitoral", "Tríceps", "Deltóide Anterior"],
  "tipo": "Anaeróbico",
  "equipamento": ["Barra", "Banco", "Anilhas"],
  "descricaoTecnica": "Deite-se no banco, pegue a barra...",
  "nivelDificuldade": "Intermediário",
  "videoUrl": "https://youtube.com/watch?v=exemplo",
  "calorias100kg": 45
}
```

## Collection: execucoes

```json
{
  "_id": ObjectId("65a1b2c3d4e5f6a7b8c9d0e3"),
  "alunoId": ObjectId("507f191e810c19729de860ea"),
  "treinoId": ObjectId("65a1b2c3d4e5f6a7b8c9d0e1"),
  "dataHora": ISODate("2024-06-15T18:30:00Z"),
  "duracaoReal": 65,
  "caloriasQueimadas": 380,
  "feedbackAluno": "Treino puxado, mas consegui completar",
  "dificuldadePercebida": 7,
  "exerciciosRealizados": [
    {
      "exercicioId": ObjectId("65a1b2c3d4e5f6a7b8c9d0e2"),
      "seriesRealizadas": 4,
      "cargaUtilizada": 60,
      "observacoes": "Última série com ajuda"
    }
  ],
  "concluido": true
}
```

## Collection: mensagens

```json
{
  "_id": ObjectId("65a1b2c3d4e5f6a7b8c9d0e4"),
  "remetenteId": ObjectId("507f1f77bcf86cd799439011"),
  "remetenteTipo": "Educador",
  "destinatarioId": ObjectId("507f191e810c19729de860ea"),
  "destinatarioTipo": "Aluno",
  "assunto": "Ajuste no treino",
  "conteudo": "Oi João, vamos reduzir a carga do supino na próxima sessão",
  "dataHora": ISODate("2024-06-16T10:15:00Z"),
  "lida": true,
  "dataLeitura": ISODate("2024-06-16T10:20:00Z"),
  "arquivosAnexos": [
    {
      "nome": "exercicio-demonstracao.jpg",
      "url": "/uploads/demo123.jpg",
      "tipo": "imagem"
    }
  ]
}
```

## Collection: avaliacoes

```json
{
  "_id": ObjectId("65a1b2c3d4e5f6a7b8c9d0e5"),
  "alunoId": ObjectId("507f191e810c19729de860ea"),
  "educadorId": ObjectId("507f1f77bcf86cd799439011"),
  "nota": 5,
  "comentario": "Excelente profissional, muito atencioso e competente",
  "dataAvaliacao": ISODate("2024-06-20T14:00:00Z")
}
```

## Collection: notificacoes

```json
{
  "_id": ObjectId("65a1b2c3d4e5f6a7b8c9d0e6"),
  "usuarioId": ObjectId("507f191e810c19729de860ea"),
  "usuarioTipo": "Aluno",
  "tipo": "lembrete_treino",
  "titulo": "Hora do treino!",
  "mensagem": "Seu treino A está agendado para hoje às 18h",
  "lida": false,
  "dataCriacao": ISODate("2024-06-15T17:00:00Z"),
  "dataLeitura": null,
  "link": "/treinos/123"
}
```
