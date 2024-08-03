const bcrypt = require("bcrypt");
const uuid = require("uuid");
var router = require("express").Router();
const dal = require("../../services/p.auth.dal");
// const dal = require('../../services/m.auth.dal')

// api/auth/username
// Fetch the specific login by username
router.get("/:username", async (req, res) => {
  // if (DEBUG) console.log('ROUTE: /api/auth/username GET ' + req.url);
  try {
    let aLogin = await dal.getLoginByUsername(req.params.username);
    if (!aLogin) {
      // Log this error to an error log file.
      res.status(404).json({ message: "Not Found", status: 404 });
    } else {
      res.json(aLogin);
    }
  } catch (error) {
    // Log this error to an error log file.
    res.status(503).json({ message: "Service Unavailable", status: 503 });
  }
});

// Reset the password
router.patch("/:id", async (req, res) => {
  // if (DEBUG) console.log("ROUTE: /api/auth PATCH " + req.params.id);
  try {
    let aLogin = await dal.getLoginById(req.params.id);
    if (!aLogin) {
      // Log this error to an error log file.
      res.status(404).json({ message: "Not Found", status: 404 });
    } else {
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await dal.patchLogin(
          req.params.id,
          aLogin.username,
          hashedPassword,
          aLogin.email
        );
        res.status(200).json({ message: "OK", status: 200 });
      } catch (error) {
        // Log this error to an error log file.
        res.status(500).json({ message: "Internal Server Error", status: 500 });
      }
    }
  } catch (error) {
    // Log this error to an error log file.
    res.status(503).json({ message: "Service Unavailable", status: 503 });
  }
});

// Delete the login
router.delete("/:id", async (req, res) => {
  // if (DEBUG) console.log('ROUTE: /api/auth DELETE ' + req.params.id);
  try {
    await dal.deleteLogin(req.params.id);
    res.status(200).json({ message: "OK", status: 200 });
  } catch (error) {
    // Log this error to an error log file.
    res.status(503).json({ message: "Service Unavailable", status: 503 });
  }
});

// List the active API routes
if (DEBUG) {
  router.stack.forEach(function (r) {
    if (r.route && r.route.path) {
      console.log(r.route.path);
    }
  });
}

module.exports = router;
