const isLoggedIn = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(401).json({message: "not authenticated"});
  } else {
    next();
  }
}

module.exports = isLoggedIn;