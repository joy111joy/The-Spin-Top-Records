const Pool = require("pg").Pool;
const pool = new Pool({
  user: "kelly",
  host: "localhost",
  database: "SpinTop",
  password: "KeyinCollege",
  port: 5432,
});
module.exports = pool;
