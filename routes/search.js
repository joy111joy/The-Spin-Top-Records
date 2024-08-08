const express = require("express");
const router = express.Router();
const { setToken, authenticateJWT } = require("../services/auth");
const myEventEmitter = require("../services/logEvents.js");
const pDal = require("../services/p.fulltext.dal");
const mDal = require("../services/m.fulltext.dal");

// SET PROTECTION
router.use(setToken);
router.use(authenticateJWT);
 


router.post("/", async (req, res) => {
  try {
    const keyword = req.body.keyword;
    const selectedDatabases = req.body.database.length ? req.body.database : ["mongodb"]; // Default to MongoDB if no selection
    const user = req.session.user;
    const id = user ? user._id : "Guest";
    // Log the keyword and selected databases
    console.log(`Keyword: ${keyword}`);
    console.log(`Selected Databases: ${selectedDatabases}`);
    console.log(`User: ${id}`);
    myEventEmitter.emit('event', 'search.post', 'keyword', `User: ${id}, Keyword: ${keyword}`);    let theResults = [];

    if (selectedDatabases.includes("both")) {
      const theResults1 = await mDal.getFullText(keyword);
      const theResults2 = await pDal.getFullText(keyword);
      theResults = [...theResults1, ...theResults2];
    } else if (selectedDatabases.includes("mongodb")) {
      theResults = await mDal.getFullText(keyword);
    } else if (selectedDatabases.includes("postgresql")) {
      theResults = await pDal.getFullText(keyword);
    }

    // Log the final results
    console.log("Final Results:", theResults);

    myEventEmitter.emit(
      "event",
      "app.post /search",
      "INFO",
      "search results fetched."
    );

    // Render only the results to be injected into the existing results container
    res.render("partials/IndexCont.ejs", { records: theResults, user: req.session.user });
  } catch (error) {
    console.error("Error performing search:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
