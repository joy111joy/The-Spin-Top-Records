const { Pool } = require("pg");
require('dotenv').config();

// Create a pool instance
const pgPool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Function to get a client from the pool
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
