const asyncMiddleware = require('../middleware/async');
const User = require('../model/User');

// @desc   register a user
// route   POST /api/v1/auth/register
// access  public
exports.register = asyncMiddleware(async (req, res, next) => {
  const { name, email, role, password } = req.body;

  const user = await User.create({
    name,
    email,
    role,
    password,
  });

  sendTokenResponse(user, 200, res);
});

// @desc   login user
// route   POST /api/v1/auth/login
// access  public
exports.login = asyncMiddleware(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      err: 'please provide a email and password',
    });
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({
      success: false,
      err: 'invalid credentials',
    });
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      err: 'invalid credentials',
    });
  }

  sendTokenResponse(user, 200, res);
});

// get token from model and send in a cookie
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(200)
    .cookie('token', token, options)
    .json({ success: true, token });
};

// @desc   get logged in user
// route   GET /api/v1/auth/me
// access  private
exports.getMe = asyncMiddleware(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({ success: true, data: user });
});
