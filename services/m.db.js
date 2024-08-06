const { MongoClient } = require('mongodb');
require('dotenv').config();

let mongoClient;

async function connectMongo() {
  console.log('Connecting to MongoDB...');
  if (!mongoClient) {
    mongoClient = await MongoClient.connect(process.env.MDBLOCAL, { useNewUrlParser: true, useUnifiedTopology: true });
  }
  return mongoClient.db(process.env.DBNAME);
}

module.exports = { connectMongo };
