const router = require('express').Router({ mergeParams: true });
const {
  getReview,
  getReviews,
  addReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviews');
const { protect, authorize } = require('../middleware/auth');
const Review = require('../model/Review');
const advancedResults = require('../middleware/advancedResult');

router
  .route('/')
  .get(
    advancedResults(Review, {
      path: 'bootcamp',
      select: 'name description',
    }),
    getReviews,
  )
  .post(protect, authorize('admin', 'user'), addReview);

router
  .route('/:id')
  .get(getReview)
  .put(protect, authorize('admin', 'user'), updateReview)
  .delete(protect, authorize('admin', 'user'), deleteReview);

module.exports = router;
