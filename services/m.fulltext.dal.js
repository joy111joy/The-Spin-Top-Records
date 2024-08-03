const { ObjectId } = require("mongodb");
const dal = require("./m.db");

async function getFullText(fulltext) {
  if (DEBUG) console.log("mongo.dal.getFullText()");
  try {
    const database = dal.connect();
    const collection = database.collection("records");
    const result = await collection
      .find({ $text: { $search: fulltext } })
      .toArray();
    return result;
  } catch (err) {
    console.error("Error occurred while connecting to MongoDB:", err);
    throw err;
  } finally {
    await dal.close();
    close();
  }
}

module.exports = {
  getFullText,
};
