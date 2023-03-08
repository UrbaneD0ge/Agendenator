const User = require('../models/User');

authUser = async (req, res, next) => {
  if (req.session.user) {
    const authorizedUser = await User.findById(req.session.email);
    next();
  } else {
    res.redirect('/login');
  }
};
