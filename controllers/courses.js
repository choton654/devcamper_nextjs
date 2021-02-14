const Course = require('../model/Course');
const asyncMiddleware = require('../middleware/async');
const BootCamp = require('../model/BootCamp');

// @desc   get all courses
// route   GET /api/v1/courses
// route   GET /api/v1/bootcamps/:bootcampId/courses
// access  public
exports.getCourses = asyncMiddleware(async (req, res, next) => {
  if (req.params.bootcampId) {
    const courses = await Course.find({ bootcamp: req.params.bootcampId });

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
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });

  if (!course) {
    return res.status(400).json({
      success: false,
      err: `Course not found with id of ${req.params.id}`,
    });
  }

  return res.status(200).json({ success: true, data: course });
});

// @desc   create a course
// route   POST /api/v1/bootcamps/:bootcampId/courses
// access  private
exports.addCourse = asyncMiddleware(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await BootCamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return res.status(400).json({
      success: false,
      err: `bootcamp not found with id of ${req.params.bootcampId}`,
    });
  }

  // check bootcamp ownership
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(400).json({
      success: false,
      err: `User ${req.user.id} is not authorize to add a course in bootcamp ${bootcamp._id}`,
    });
  }

  const course = await Course.create(req.body);

  return res.status(200).json({
    success: true,
    data: course,
  });
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

  // check course ownership
  if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(400).json({
      success: false,
      err: `User ${req.user.id} is not authorize to update course ${course._id}`,
    });
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    data: course,
  });
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

  // check course ownership
  if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(400).json({
      success: false,
      err: `User ${req.user.id} is not authorize to delete a course ${course._id}`,
    });
  }

  await course.remove();

  return res.status(200).json({
    success: true,
    data: {},
  });
});
