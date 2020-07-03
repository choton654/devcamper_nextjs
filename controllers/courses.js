const Course = require('../model/Course');
const asyncMiddleware = require('../middleware/async');

// @desc   get all courses
// route   GET /api/v1/courses
// route   GET /api/v1/bootcamps/:bootcampId/courses
// access  public
exports.getCourses = asyncMiddleware(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate({
      path: 'bootcamp',
      select: 'name description',
    });
  }

  const courses = await query;
  return res
    .status(200)
    .json({ success: true, count: courses.length, data: courses });
});
