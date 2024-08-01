const express = require("express");
const router = express.Router();
const { setToken, authenticateJWT } = require("./auth");
const myEventEmitter = require("../services/logEvents.js");

const pDal = require("../../services/p.fulltext.dal");
const mDal = require("../../services/m.fulltext.dal");

// Use the setToken middleware to set the JWT token from the session
router.use(setToken);

// Protect all API routes with the authenticateJWT middleware
router.use(authenticateJWT);

router.get("/", async (req, res) => {
  const theResults = [];
  myEventEmitter.emit(
    "event",
    "app.get /search",
    "INFO",
    "search page (search.ejs) was displayed."
  );
  res.render("search", { status: req.session.status, theResults });
});

router.post("/", async (req, res) => {
  let theResults1 = await mDal.getFullText(req.body.keyword);
  let theResults2 = await pDal.getFullText(req.body.keyword);
  myEventEmitter.emit(
    "event",
    "app.post /search",
    "INFO",
    "search page (search.ejs) was displayed."
  );
  res.render("search", {
    status: req.session.status,
    theResults1,
    theResults2,
  });
});

module.exports = router;
