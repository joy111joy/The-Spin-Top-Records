var router = require("express").Router();
const { setToken, authenticateJWT } = require("../../middlewares/auth");

const DEBUG = process.env.DEBUG || false;

if (DEBUG) {
  console.log("ROUTE: /api/auth");
  console.log("ROUTE: /api/full");
}

// Use the setToken middleware to set the JWT token from the session
router.use(setToken);

// Protect all API routes with the authenticateJWT middleware
router.use(authenticateJWT);

// Ensure you have the correct path and export
const authRouter = require("../auth");
router.use("/auth", authRouter);

module.exports = router;
