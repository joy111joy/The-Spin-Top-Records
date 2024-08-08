const { MongoClient } = require('mongodb');
require('dotenv').config();

let mongoClient;

//function to connect to MongoDB used in auth and fulltext files
async function connectMongo() {
  console.log('Connecting to MongoDB...');
  if (!mongoClient) {
    //get connection using environment variables
    mongoClient = await MongoClient.connect(process.env.MDBLOCAL, { useNewUrlParser: true, useUnifiedTopology: true });
  }
  return mongoClient.db(process.env.DBNAME);
}

module.exports = { connectMongo };
