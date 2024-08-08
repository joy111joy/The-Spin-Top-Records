const { ObjectId } = require("mongodb");
const dal = require("./m.db");

//function to get all logins
async function getLogins() {
  try {
    console.log("Connecting to MongoDB...");
    const db = await dal.connectMongo();
    console.log("Connected to MongoDB");

    console.log("Fetching logins...");
    const cursor = db.collection("logins").find();
    const results = await cursor.toArray();

    console.log("Logins fetched:", results);
    return results;
  } catch (error) {
    console.error("Error in getLogins:", error);
    throw error;
  }
}

//function to get login by username
async function getLoginByUsername(name) {
  try {
    const db = await dal.connectMongo();
    const result = await db.collection("logins").findOne({ username: name });
    return result;
  } catch (error) {
    console.error("Error in getLoginByUsername:", error);
    throw error;
  }
}

//function to get login by email
async function getLoginByEmail(email) {
  try {
    const db = await dal.connectMongo();
    const result = await db.collection("logins").findOne({ email: email });
    return result;
  } catch (error) {
    console.error("Error in getLoginByEmail:", error);
    throw error;
  }
}

//function to get login by id
async function getLoginById(id) {
  try {
    const db = await dal.connectMongo();
    const result = await db.collection("logins").findOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.error("Error in getLoginById:", error);
    throw error;
  }
}

//function to add login
async function addLogin(name, email, password, uuidv4) {
  // Create a new login object
  let newLogin = {
    username: name,
    email: email,
    password: password,
    uuid: uuidv4,
    last_updated: new Date(),
  };

  try {
    const db = await dal.connectMongo();
    const result = await db.collection("logins").insertOne(newLogin);
    return result.insertedId;
  } catch (error) {
    if (error.code === 11000) {
      console.error("Duplicate key error:", error);
      return error;
    }
    console.error("Error in addLogin:", error);
    throw error;
  }
}

//function to get all records
async function getRecords() {
  try {
    console.log("Connecting to MongoDB...");
    const db = await dal.connectMongo();
    console.log("Connected to MongoDB");

    console.log("Fetching records...");
    const cursor = db.collection("Records").find();
    const results = await cursor.toArray();
    
    console.log("Records fetched");
    return results;
  } catch (error) {
    console.error("Error in getRecords:", error);
    throw error;
  }
}

//function to search records
async function searchRecords(query) {
  try {
    const db = await dal.connectMongo();
    const cursor = db.collection("Records").find({ title: new RegExp(query, 'i') }); // Adjust the query based on your collection schema
    const results = await cursor.toArray();
    return results;
  } catch (error) {
    console.error("Error in searchRecords:", error);
    throw error;
  }
}

module.exports = {
  searchRecords,
  getLogins,
  getLoginByUsername,
  addLogin,
  getLoginByEmail,
  getLoginById,
  getRecords,
};
