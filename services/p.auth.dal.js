const connectPostgres = require("./p.db");

async function getLogins() {
  let SQL = `SELECT * FROM public."Logins"`;
  try {
    const pool = await connectPostgres();
    let results = await pool.query(SQL, []);
    return results.rows;
  } catch (error) {
    console.log(error);
  }
}

async function getLoginByUsername(username) {
  let SQL = `SELECT login_id AS id, username, password, email FROM public."Logins" WHERE username = $1`;
  try {
    const pool = await connectPostgres();
    let results = await pool.query(SQL, [username]);
    if (DEBUG) console.log(`results after query: ${JSON.stringify(results.rows[0])}`);
    return results.rows[0];
  } catch (error) {
    console.log(error);
  }
}

async function getLoginByEmail(email) {
  let SQL = `SELECT login_id AS id, username, password, email FROM public."Logins" WHERE email = $1`;
  try {
    const pool = await connectPostgres();
    let results = await pool.query(SQL, [email]);
    return results.rows[0];
  } catch (error) {
    console.log(error);
  }
}

async function getLoginById(id) {
  let SQL = `SELECT login_id AS id, username, password, email FROM public."Logins" WHERE login_id = $1`;
  try {
    const pool = await connectPostgres();
    let results = await pool.query(SQL, [id]);
    return results.rows[0];
  } catch (error) {
    console.log(error);
  }
}

async function addLogin(name, email, password, uuidv4) {
  let SQL = `INSERT INTO public."Logins"(username, email, password, uuid)
    VALUES ($1, $2, $3, $4) RETURNING login_id;`;
  try {
    const pool = await connectPostgres();
    let results = await pool.query(SQL, [name, email, password, uuidv4]);
    return results.rows[0].login_id;
  } catch (error) {
    if (error.code === "23505") return error; // Duplicate username
    console.log(error);
  }
}

async function verifyLogin(username, password) {
  const isMatch = await bcrypt.compare('P@ssw0rd123!', 'stored-hashed-password');
  console.log('Password match:', isMatch);

  try {
    const user = await getLoginByUsername(username);
    if (!user) {
      console.log("User not found");
      return null;
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      console.log("Incorrect password");
      return null;
    }
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function getRecords() {
  console.log("Connecting to pg database...");
  let SQL = `SELECT * FROM public."Records"`;
  try {
    const pool = await connectPostgres();
    let results = await pool.query(SQL, []);
    return results.rows;
  } catch (error) {
    console.log(error);
  }
}

async function searchRecords(query) {
  let SQL = `SELECT * FROM public."Records" WHERE title ILIKE $1`; // Adjust based on your table schema
  try {
    const pool = await connectPostgres();
    let results = await pool.query(SQL, [`%${query}%`]);
    return results.rows;
  } catch (error) {
    console.log("Error in searchRecords:", error);
    throw error;
  }
}

router.get('/search', async (req, res) => {
  req.session.user = user;
  return;
});

module.exports = {
  getLogins,
  getLoginByUsername,
  getLoginByEmail,
  getLoginById,
  addLogin,
  verifyLogin,
  getRecords,
  searchRecords,
};
