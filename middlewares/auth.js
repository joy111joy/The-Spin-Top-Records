// middlewares/auth.js
function setToken(req, res, next) {
    // Middleware logic to set the JWT token
    next(); // Pass control to the next middleware function
  }
  
  function authenticateJWT(req, res, next) {
    // Middleware logic to authenticate the JWT token
    next(); // Pass control to the next middleware function
  }
  
  module.exports = { setToken, authenticateJWT };
  