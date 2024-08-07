const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

async function getFullText(keyword) {
  try {
    const query = `
      SELECT *
      FROM public."Records"
      WHERE "title" ILIKE $1
        OR "artist" ILIKE $1
        OR "genre" ILIKE $1
        OR "label" ILIKE $1
        OR "description" ILIKE $1
    `;
    const values = [`%${keyword}%`];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (err) {
    console.error('Error executing PostgreSQL full text search', err);
    return [];
  }
}

module.exports = { getFullText };

