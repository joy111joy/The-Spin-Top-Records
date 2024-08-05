const { MongoClient } = require("mongodb");
require("dotenv").config();

const url = process.env.MDBLOCAL;
const dbName = process.env.DBNAME;
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
