const { Pool } = require("pg");
require('dotenv').config();

// Create a pool instance
const pgPool = new Pool({
  // Use environment variables to connect to the database
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

//function to connect to postgresql used in auth and fulltext files
async function connectPostgres() {
  console.log("Connecting to Postgres...");
  try {
    // Test the connection
    await pgPool.query('SELECT NOW()');
    return pgPool;
  } catch (error) {
    console.error("Error connecting to Postgres:", error);
    throw error;
  }
}

module.exports = { connectPostgres };
