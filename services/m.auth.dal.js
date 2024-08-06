const { ObjectId } = require("mongodb");
const dal = require("./m.db");

async function getLogins() {
  try {
    console.log("Connecting to database...");
    const db = await dal.connect();
    console.log("Connected to database");

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


async function getLoginByUsername(name) {
  try {
    const db = await dal.connect();
    const result = await db.collection("logins").findOne({ username: name });
    return result;
  } catch (error) {
    console.error("Error in getLoginByUsername:", error);
    throw error;
  }
}

async function getLoginByEmail(email) {
  try {
    const db = await dal.connect();
    const result = await db.collection("logins").findOne({ email: email });
    return result;
  } catch (error) {
    console.error("Error in getLoginByEmail:", error);
    throw error;
  }
}

async function getLoginById(id) {
  try {
    const db = await dal.connect();
    const result = await db.collection("logins").findOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.error("Error in getLoginById:", error);
    throw error;
  }
}

async function addLogin(name, email, password, uuidv4) {
  let newLogin = {
    username: name,
    email: email,
    password: password,
    uuid: uuidv4,
    last_updated: new Date(),
  };

  try {
    const db = await dal.connect();
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

async function getRecords() {
  try {
    console.log("Connecting to database...");
    const db = await dal.connect();
    console.log("Connected to database");

    console.log("Fetching Records...");
    const cursor = db.collection("Records").find();
    const results = await cursor.toArray();


async function getRecords() {
  try {
    console.log("Connecting to database...");
    const db = await dal.connect();
    console.log("Connected to database");

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


module.exports = {
  getRecords,
  getLogins,
  getLoginByUsername,
  addLogin,
  getLoginByEmail,
  getLoginById,
  getRecords,
};
