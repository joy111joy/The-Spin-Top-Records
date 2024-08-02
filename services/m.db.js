// m.db.js
const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017/"; // MongoDB server URL
const dbName = "TheSpinTopRecords";
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
