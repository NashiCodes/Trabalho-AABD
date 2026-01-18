# MongoDB - Documentação e Guia de Uso

---

## 📚 Glossário - Modelagem de Dados

Para entender a estrutura completa do banco de dados, incluindo todas as coleções, campos, relacionamentos e conceitos de modelagem, consulte:

📄 **[Modelagem de Dados Completa](./modelagem-mongo.md)**

---

## 💡 Glossário - Exemplos e Queries

Para ver exemplos práticos de uso dos operadores MongoDB e detalhes sobre as 10 queries implementadas, consulte:

💻 **[Exemplos e Queries MongoDB](./exemplos-mongo.md)**


---

## 🚀 Como Rodar as Queries para MongoDB

### Pré-requisitos

1. **MongoDB instalado e rodando**
   ```bash
   # Verificar se o MongoDB está rodando
   mongosh --version
   
   # Iniciar MongoDB (se não estiver rodando)
   sudo systemctl start mongod
   ```

2. **Node.js instalado**
   ```bash
   node --version  # Deve ser v18 ou superior
   npm --version
   ```

### Instalação

1. **Clone o repositório** (se ainda não fez)
   ```bash
   git clone https://github.com/NashiCodes/Trabalho-AABD.git
   cd Trabalho-AABD
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o MongoDB**
   
   O projeto está configurado para conectar em:
   ```
   mongodb://localhost:27017/mongo-fit
   ```
   
   Para alterar, edite o arquivo: `src/mongo/config/connection.js`

### Executar as Queries

**Comando que executará todas:**
```bash
npm run mongo-queries
```

Este comando irá:
1. ✅ Conectar ao MongoDB
2. ✅ Popular o banco de dados com 10 registros de cada coleção
3. ✅ Executar as 10 queries sequencialmente
4. ✅ Exibir os resultados formatados no console

### Saída Esperada

```
Conectado ao MongoDB
🚀 Iniciando população do banco de dados...

✅ 10 educadores populados com sucesso!
✅ 10 alunos populados com sucesso!
✅ 10 exercícios populados com sucesso!
✅ 8 treinos populados com sucesso!
✅ 10 avaliações populadas com sucesso!
✅ 10 execuções populadas com sucesso!
✅ 10 mensagens populadas com sucesso!
✅ 10 notificações populadas com sucesso!

✨ Banco de dados populado com sucesso!

=== Query 1: Buscar alunos com IMC entre 22 e 26 usando $gte e $lte ===

Query: 
Aluno.find({ 'dadosFisicos.imc': { $gte: 22, $lte: 26 } }).select('nome dadosFisicos.imc');


Encontrados 7 alunos com IMC entre 22 e 26:
- João Silva: IMC 25.6
- Maria Oliveira: IMC 22.8

... (continua para as outras 9 queries)
```

### Verificar Dados no MongoDB

Após executar, você pode verificar os dados diretamente no MongoDB:

```bash
# Conectar ao MongoDB Shell
mongosh

# Usar o banco de dados
use mongo-fit

# Ver coleções
show collections

# Consultar dados
db.alunos.find().pretty()
db.educadores.find().pretty()
db.treinos.find().pretty()
```

### Troubleshooting

**Erro de conexão com MongoDB:**
```bash
# Verificar se o MongoDB está rodando
sudo systemctl status mongod

# Iniciar MongoDB
sudo systemctl start mongod
```

**Porta já em uso:**
- O MongoDB usa a porta padrão `27017`
- Verifique se não há outra instância rodando

**Limpar o banco de dados:**
```bash
mongosh
use mongo-fit
db.dropDatabase()
```

Depois execute novamente: `npm run mongo-queries`

---

## 📂 Estrutura de Dados Populada

Ao executar o script, o banco será populado com:
- 👤 **10 Alunos** com perfis variados (iniciante, intermediário, avançado)
- 🏋️ **10 Educadores** com diferentes especialidades
- 💪 **10 Exercícios** de diversos grupos musculares
- 📋 **8 Treinos** com diferentes objetivos e níveis
- ⭐ **10 Avaliações** de alunos sobre educadores
- 📊 **10 Execuções** de treinos com feedback
- 💬 **10 Mensagens** trocadas entre alunos e educadores
- 🔔 **10 Notificações** do sistema

