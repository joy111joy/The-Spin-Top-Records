const { MongoClient } = require("mongodb");
const uri = process.env.MDBLOCAL; // "kstoyles@cluster0.ufay3sq.mongodb.net";
const pool = new MongoClient(uri);

module.exports = pool;

//const { MongoClient } = require('mongodb');
//const uri = process.env.MDBLOCAL // "mongodb://127.0.0.1:27017/";
//const pool = new MongoClient(uri);

//module.exports = pool;
