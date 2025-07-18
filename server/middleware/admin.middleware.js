// Middleware to check if the user is an admin
const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  } else {
    return res.status(403).json({ message: 'Access denied: Admins only.' });
  }
};

module.exports = adminMiddleware;
