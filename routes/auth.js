const express = require("express");
const router = express.Router();
const {
  setToken,
  authenticateJWT,
  ensureAuthenticated,
} = require("../services/auth");
const myEventEmitter = require("../services/logEvents.js");

// Use the setToken middleware to set the JWT token from the session
router.use(setToken);

// Protect all API routes with the authenticateJWT middleware
router.use(authenticateJWT);

router.get("/", async (req, res) => {
  myEventEmitter.emit(
    "event",
    "app.get /search",
    "INFO",
    "search page (search.ejs) was displayed."
  );
  res.render("search", { status: req.session.status });
});

module.exports = router;
