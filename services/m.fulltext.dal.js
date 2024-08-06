const { MongoClient } = require('mongodb');
const url = process.env.MDBLOCAL;
const dbName = process.env.DBNAME;

async function getFullText(keyword) {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('Records');
    const results = await collection.find({
      $text: { $search: keyword }
    }).toArray();
    return results;
  } finally {
    await client.close();
  }
}

module.exports = { getFullText };
