require('module-alias/register');
const { connectMongoDB } = require('./mongo/connection');

// Conectar ao MongoDB
connectMongoDB();
