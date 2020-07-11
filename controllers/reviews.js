const Review = require('../model/Review');
const asyncMiddleware = require('../middleware/async');
const BootCamp = require('../model/BootCamp');

// @desc   get all reviews
// route   GET /api/v1/reviews
// route   GET /api/v1/bootcamps/:bootcampId/reviews
// access  public
exports.getReviews = asyncMiddleware(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({
      bootcamp: req.params.bootcampId,
    }).populate([
      {
        path: 'bootcamp',
        select: 'name description',
      },
      {
        path: 'user',
        select: 'name',
      },
    ]);

    return res
      .status(200)
      .json({ success: true, count: reviews.length, data: reviews });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc   get a single review
// route   GET /api/v1/reviews/:id
// access  public
exports.getReview = asyncMiddleware(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate([
    {
      path: 'bootcamp',
      select: 'name description',
    },
    {
      path: 'user',
      select: 'name',
    },
  ]);

  // {
  //   path: 'bootcamp',
  //   select: 'name description',
  // }

  if (!review) {
    return res.status(404).json({
      success: false,
      err: `review not found with id of ${req.params.id}`,
    });
  }

  return res.status(200).json({ success: true, data: review });
});

// @desc   create reviews
// route   GET /api/v1/bootcamps/:bootcampId/reviews
// access  private
exports.addReview = asyncMiddleware(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await BootCamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return res.status(400).json({
      success: false,
      err: `bootcamp not found with id of ${req.params.bootcampId}`,
    });
  }

  const review = await Review.create(req.body);

  return res.status(200).json({
    success: true,
    data: review,
  });
});

// @desc   update a review
// route   PUT /api/v1/reviews/:id
// access  private
exports.updateReview = asyncMiddleware(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    return res.status(400).json({
      success: false,
      err: `review not found with id of ${req.params.id}`,
    });
  }

  // check review ownership
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(400).json({
      success: false,
      err: `User ${req.user.id} is not authorize to update review ${review._id}`,
    });
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    data: review,
  });
});

// @desc   delete a review
// route   DELETE /api/v1/reviews/:id
// access  private
exports.deleteReview = asyncMiddleware(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return res.status(400).json({
      success: false,
      err: `review not found with id of ${req.params.id}`,
    });
  }

  // check review ownership
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(400).json({
      success: false,
      err: `User ${req.user.id} is not authorize to delete a review ${review._id}`,
    });
  }

  await review.remove();

  return res.status(200).json({
    success: true,
    data: {},
  });
});
