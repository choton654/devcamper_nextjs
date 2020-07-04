const Course = require('../model/Course');
const asyncMiddleware = require('../middleware/async');
const BootCamp = require('../model/BootCamp');

// @desc   get all courses
// route   GET /api/v1/courses
// route   GET /api/v1/bootcamps/:bootcampId/courses
// access  public
exports.getCourses = asyncMiddleware(async (req, res, next) => {
  if (req.params.bootcampId) {
    const courses = Course.find({ bootcamp: req.params.bootcampId });

    return res
      .status(200)
      .json({ success: true, count: courses.length, data: courses });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc   get a single course
// route   GET /api/v1/courses/:id
// access  public
exports.getCourse = asyncMiddleware(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(400).json({
      success: false,
      err: `Course not found with id of ${req.params.id}`,
    });
  }

  return res.status(200).json({ success: true, data: course });
});

// @desc   create a course
// route   GET /api/v1/bootcamps/:bootcampId/courses
// access  private
exports.addCourse = asyncMiddleware(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await BootCamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return res.status(400).json({
      success: false,
      err: `bootcamp not found with id of ${req.params.bootcampId}`,
    });
  }

  const course = await Course.create(req.body);

  return res.status(200).json({ success: true, data: course });
});

// @desc   update a course
// route   PUT /api/v1/courses/:id
// access  private
exports.updateCourse = asyncMiddleware(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(400).json({
      success: false,
      err: `course not found with id of ${req.params.id}`,
    });
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({ success: true, data: course });
});

// @desc   delete a course
// route   DELETE /api/v1/courses/:id
// access  private
exports.deleteCourse = asyncMiddleware(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(400).json({
      success: false,
      err: `course not found with id of ${req.params.id}`,
    });
  }

  await course.remove();

  return res.status(200).json({ success: true, data: {} });
});
