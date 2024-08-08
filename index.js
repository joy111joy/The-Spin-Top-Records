if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
//Import needed modules
const express = require("express");
const app = express();
const session = require("express-session");
const apiRouter = require("./routes/api/index");
const myEventEmitter = require("./services/logEvents.js");
const { connectMongo } = require('./services/m.db');
const { connectPostgres } = require('./services/p.db');

//Use the API router
app.use("/api", apiRouter);

//Set the port
const PORT = process.env.PORT || 3000;
global.DEBUG = true;

//Set the view engine and static folder
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret:
      process.env.SESSION_SECRET || "kstoyles@cluster0.ufay3sq.mongodb.net",
    resave: false,
    saveUninitialized: false,
  })
);

//Start the server
app.listen(PORT, (err) => {
  if (err) console.log(err);
  myEventEmitter.emit(
    "event",
    "app.listen",
    "SUCCESS",
    "http search site successfully started."
  );
  console.log(`Simple app running on port ${PORT}.`);
});

//Routes
app.get("/", async (req, res) => {
  myEventEmitter.emit(
    "event",
    "app.get",
    "INFO",
    "landing page (index.ejs) was displayed."
  );

  // Get the user from the session
  const user = req.session.user;
  // Get the query from the URL query string
  const query = req.query.query || "";
  const selectedDatabases = req.query.database ? req.query.database.split(',') : ["mongodb"]; // Default to MongoDB if no selection

  let records = [];

  // Log the query and selected databases using try catch for error handling
  try {
    if (user) {
      if (selectedDatabases.includes("both")) {
        const db1 = await connectMongo();
        const db2 = await connectPostgres();
        const recordsMongo = await db1
          .collection("Records")
          .find({ title: new RegExp(query, "i") })
          .toArray();
        const recordsPostgres = await db2.query(
          `SELECT * FROM public."Records" WHERE title ILIKE $1`,
          [`%${query}%`]
        );
        records = [...recordsMongo, ...recordsPostgres.rows];
      } else if (selectedDatabases.includes("mongodb")) {
        const db = await connectMongo();
        records = await db
          .collection("Records")
          .find({ title: new RegExp(query, "i") })
          .toArray();
      } else if (selectedDatabases.includes("postgresql")) {
        const db = await connectPostgres();
        const result = await db.query(
          `SELECT * FROM public."Records" WHERE title ILIKE $1`,
          [`%${query}%`]
        );
        records = result.rows;
      }
    }

    // Render the index page with the user, records, query, selected databases, and status
    res.render("index", {
      user: user ? user.username : "Guest",
      records: records,
      query: query,
      selectedDatabases: selectedDatabases,
      status: req.session.status,
    });
  } catch (error) { //Error handling
    console.error("Error fetching records:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GET the about page
app.get("/about", async (req, res) => {
  myEventEmitter.emit(
    "event",
    "app.get /about",
    "INFO",
    "about page (about.ejs) was displayed."
  );
  res.render("about", { status: req.session.status });
});

//Search router
const searchRouter = require("./routes/search");
app.use("/search", searchRouter);

// GET the login page
const authRouter = require("./routes/auth");
app.use("/auth", authRouter);


//status 404
app.use((req, res) => {
  res.status(404).render("404", { status: req.session.status });
});

module.exports = app;
