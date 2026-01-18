const mongoose = require('mongoose');

const connectMongoDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mongo-fit');
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};

const connectMongoDBTest = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mongofit_test');
    console.log('Conectado ao MongoDB Test');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB Test:', error);
    process.exit(1);
  }
};

const mongoHealth = async () => {
  return mongoose.connection.readyState;
};

const mongoInfo = () => {
  const connectionStates = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  const mongoStatus = mongoose.connection.readyState;
  const isConnected = mongoStatus === 1;

  return {
    status: connectionStates[mongoStatus],
    connected: isConnected,
    database: mongoose.connection.name || 'N/A',
    host: mongoose.connection.host || 'N/A',
  };
};

module.exports = { connectMongoDB, connectMongoDBTest, mongoose, mongoHealth, mongoInfo };
