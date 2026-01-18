require('module-alias/register');
const express = require('express');
const { connectMongoDB } = require('./mongo/connection');
const router = require('./router');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsing de JSON
app.use(express.json());

// Conectar ao MongoDB
connectMongoDB();

// Usar o router
app.use(router);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
