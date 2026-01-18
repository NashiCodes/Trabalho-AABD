const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Importar rotas
const routes = require('./mongo/routes');

// Middleware para parsing de JSON
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/mongo-fit')
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rota básica
app.get('/', (req, res) => {
  res.json({ message: 'API Mongo Fit - Servidor funcionando!' });
});

// Rota de status
app.get('/api/status', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Rotas da API
app.use('/api', routes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
