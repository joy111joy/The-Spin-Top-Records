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
      WHERE to_tsvector("title" || ' ' || "artist" || ' ' || "genre" || ' ' || "label" || ' ' || "description") @@ plainto_tsquery($1)
    `;
    const values = [keyword];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (err) {
    console.error('Error executing PostgreSQL full text search', err);
    return [];
  }
}

module.exports = { getFullText };
