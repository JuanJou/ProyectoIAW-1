const isAuthenticated=function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
}

module.exports=isAuthenticated;
