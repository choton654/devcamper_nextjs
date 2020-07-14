const asyncMiddleware = require('../middleware/async');
const User = require('../model/User');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cookie = require('cookie');
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

// @desc   logout user
// route   GET /api/v1/auth/logout
// access  private
exports.logout = asyncMiddleware(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ success: true, data: {} });
});

// @desc   get logged in user
// route   GET /api/v1/auth/me
// access  private
exports.getMe = asyncMiddleware(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({ success: true, data: user });
});

// @desc   update user details
// route   PUT /api/v1/auth/updatedetails
// access  private
exports.updateDetails = asyncMiddleware(async (req, res, next) => {
  const updatedFields = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, updatedFields, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: user });
});

// @desc   update user password
// route   PUT /api/v1/auth/updatepassword
// access  private
exports.updatePassword = asyncMiddleware(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return res
      .status(401)
      .json({ success: false, err: 'password is incorrect' });
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc   forgot password
// route   POST /api/v1/auth/forgotpassword
// access  public
exports.forgotPassword = asyncMiddleware(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({
      success: false,
      err: 'there is no user with that email',
    });
  }

  // get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message,
    });

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return res
      .status(500)
      .json({ success: false, err: 'Email could not be send' });
  }

  res.status(200).json({ success: true, data: user });
});

// @desc      Reset password
// @route     PUT /api/v1/auth/resetpassword/:resettoken
// @access    Public
exports.resetPassword = asyncMiddleware(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ sucess: false, err: 'Invalid token' });
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// get token from model and send in a cookie
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    path: '/',
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  // res.setHeader('Set-Cookie', cookie.serialize('auth', token, options));
  res
    .status(200)
    .cookie('token', token, options)
    .json({ success: true, token, user });
};
