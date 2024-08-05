// m.db.js
const { MongoClient } = require("mongodb");
require("dotenv").config();

const url = process.env.MDBLOCAL; // MongoDB server URL
const dbName = process.env.DBNAME; // Database name
let client;

async function connect() {
  if (!client) {
    client = new MongoClient(url);
    await client.connect();
  }
  return client.db(dbName);
}

module.exports = {
  connect,
};
