const express = require('express');
const { mongoHealth, mongoInfo } = require('./mongo/connection');
const router = express.Router();

// Importar rotas do MongoDB
const mongoRoutes = require('./mongo/routes');

// Rota básica
router.get('/', (req, res) => {
  res.json({ message: 'API Mongo Fit - Servidor funcionando!' });
});

// Rota de status
router.get('/api/status', (req, res) => {
  const mongoStatus = mongoHealth();
  const isConnected = mongoStatus === 1;

  const response = {
    status: isConnected ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    services: {
      mongodb: mongoInfo(),
    },
  };

  const statusCode = isConnected ? 200 : 503;
  res.status(statusCode).json(response);
});

// Rotas da API MongoDB
router.use('/api/mongo', mongoRoutes);

// Futuramente: Rotas da API Neo4j
// const neo4jRoutes = require('./neo4j/routes');
// router.use('/api/neo4j', neo4jRoutes);

module.exports = router;
