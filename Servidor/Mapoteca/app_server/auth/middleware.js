const isAuthenticated=function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  else{
    res.send("No loggeado");
  }
}

module.exports=isAuthenticated;
