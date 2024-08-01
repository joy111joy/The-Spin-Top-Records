if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const session = require("express-session");
const myEventEmitter = require("./services/logEvents.js");

// Import Routers
const searchRouter = require("./routes/search");
const authRouter = require("./routes/auth");
const apiRouter = require("./routes/api");

const PORT = process.env.PORT || 3000;
global.DEBUG = true;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Use Routers
app.use("/search", searchRouter);
app.use("/auth", authRouter);
app.use("/api", apiRouter);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  myEventEmitter.emit(
    "event",
    "app.listen",
    "SUCCESS",
    "HTTP search site successfully started."
  );
  console.log(`Simple app running on port ${PORT}.`);
});

app.get("/", async (req, res) => {
  myEventEmitter.emit(
    "event",
    "app.get",
    "INFO",
    "Landing page (index.ejs) was displayed."
  );
  res.render("index", { status: req.session.status });
});

app.get("/about", async (req, res) => {
  myEventEmitter.emit(
    "event",
    "app.get /about",
    "INFO",
    "About page (about.ejs) was displayed."
  );
  res.render("about", { status: req.session.status });
});

// 404 Error Page
app.use((req, res) => {
  res.status(404).render("404", { status: req.session.status });
});

module.exports = app;
