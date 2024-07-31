const express = require("express");
const router = express.Router();
const { setToken, authenticateJWT } = require("../services/auth");
const myEventEmitter = require("../services/logEvents.js");
const pDal = require("../services/p.fulltext.dal");
const mDal = require("../services/m.fulltext.dal");

//SET PROTECTION
router.use(setToken);
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
  const theResults = [...theResults1, ...theResults2];
  myEventEmitter.emit(
    "event",
    "app.post /search",
    "INFO",
    "search page (search.ejs) was displayed."
  );
  res.render("search", { status: req.session.status, theResults });
});

module.exports = router;
