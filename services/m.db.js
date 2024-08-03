// m.db.js
const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017/"; // MongoDB server URL
//const url: "ac-ii5byk9-shard-00-02.ufay3sq.mongodb.net:27017/";
const dbName = "TheSpinTopRecords";
let client;

async function connect() {
  if (!client) {
    client = new MongoClient(url);
    await client.connect();
  }
  return client.db(dbName);
}
async function close() {
  if (client) {
    await client.close();
    client = null;
  }
}

module.exports = { connect, close };
