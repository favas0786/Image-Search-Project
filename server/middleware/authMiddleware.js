const ensureAuthenticated = (req, res, next) => {
  // Passport adds the `isAuthenticated()` method to the request object
  if (req.isAuthenticated()) {
    // If user is logged in, proceed to the next middleware or route handler
    return next();
  }
  
  // If user is not logged in, send an unauthorized error
  res.status(401).json({
    success: false,
    message: 'User not authenticated'
  });
};

module.exports = { ensureAuthenticated };