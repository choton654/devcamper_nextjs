const jwt = require('jsonwebtoken');
const asyncMiddleware = require('./async');
const User = require('../model/User');
const { default: next } = require('next');

// protect
exports.protect = asyncMiddleware(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // else if ( req.cookies.token )
  // {
  //   token = req.cookies.token
  // }

  if (!token) {
    return res
      .status(400)
      .json({ success: false, err: 'Not authorize in this route' });
  }

  try {
    // verify token
    let decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findOne({ _id: decode.id });

    next();
  } catch (error) {
    return res.status(400).json({ success: false, err: error.message });
  }
});

//  gratn access to specific user
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        err: `User of role ${req.user.role} is not authorize`,
      });
    }
    next();
  };
};
