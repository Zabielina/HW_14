const blockAuthRoutes = (req, res, next) => {
 
    if (req.session.user) {
    
      if (req.path === '/user/signup' || req.path === '/user/signin') {
        return res.status(403).json({ message: 'Access forbidden for logged-in users' });
      }
    }
    next();
  };
  
  export default blockAuthRoutes;
  