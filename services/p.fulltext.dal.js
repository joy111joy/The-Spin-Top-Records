const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Function to search for a keyword in all columns of the Records table
async function getFullText(keyword) {
  try {
    // Create a query to search for the keyword in all columns
    const query = `
      SELECT *
      FROM public."Records"
      WHERE "title" ILIKE $1
        OR "artist" ILIKE $1
        OR "genre" ILIKE $1
        OR "label" ILIKE $1
        OR CAST("ReleaseYear" AS TEXT) ILIKE $1
    `;
    // Execute the query
    const values = [`%${keyword}%`];
    const result = await pool.query(query, values);
    // Return the results
    return result.rows;
  } catch (err) { // Error handling
    console.error('Error executing PostgreSQL full text search', err);
    return [];
  }
}

module.exports = { getFullText };

