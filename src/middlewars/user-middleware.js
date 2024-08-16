const auth = (req, res, next) => {
  
  if (req.session.user && req.session.email) {
    res.locals.user = req.session.user;
  }
  next();
};

export default auth;

