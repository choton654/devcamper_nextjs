const asyncMiddleware = require('../middleware/async');
const User = require('../model/User');

// @desc   get all users
// route   GET /api/v1/users
// access  private/admin
exports.getUsers = asyncMiddleware(async (req, res, next) => {
  const users = await User.find();

  return res.status(200).json(res.advancedResults);
});

// @desc   get a single users
// route   GET /api/v1/users/:id
// access  private/admin
exports.getUser = asyncMiddleware(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res
      .status(400)
      .json({ success: false, err: 'there is no such user' });
  }

  return res.status(200).json({ success: true, data: user });
});

// @desc   create user
// route   POST /api/v1/users/
// access  private/admin
exports.createUser = asyncMiddleware(async (req, res, next) => {
  const user = await User.create(req.body);

  return res.status(200).json({ success: true, data: user });
});

// @desc   update a user
// route   PUT /api/v1/users/:id
// access  private/admin
exports.updateUser = asyncMiddleware(async (req, res, next) => {
  let user = await User.findOne({ _id: req.params.id });

  if (!user) {
    return res
      .status(400)
      .json({ success: false, err: 'there is no such user' });
  }

  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({ success: true, data: user });
});

// @desc   delete a user
// route   DELETE /api/v1/users/:id
// access  private/admin
exports.deleteUser = asyncMiddleware(async (req, res, next) => {
  await User.findOneAndDelete(req.params.id);

  return res.status(200).json({ success: true, data: {} });
});
