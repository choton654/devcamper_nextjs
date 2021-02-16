const router = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user');
const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResult');
const User = require('../model/User');

router.use(protect);
// router.use(authorize('admin'));

router.route('/').get(advancedResults(User), getUsers).post(createUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
