const BootCamp = require('../model/BootCamp');
const asyncMiddleware = require('../middleware/async');

// @desc   get all bootcamps
// route   GET /api/v1/bootcamps
// access  public
exports.getBootcamps = asyncMiddleware(async (req, res, next) => {
  const bootcamps = await BootCamp.find();
  return res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});

// @desc   get single bootcamps
// route   GET /api/v1/bootcamps/:id
// access  public
exports.getBootcamp = asyncMiddleware(async (req, res, next) => {
  const bootcamp = await BootCamp.findById(req.params.id);

  if (!bootcamp) {
    return res.status(400).json({
      success: false,
      err: `Bootcamp not found with id of ${req.params.id}`,
    });
  }
  return res.status(200).json({ success: true, data: bootcamp });
});

// @desc   create bootcamps
// route   POSt /api/v1/bootcamps
// access  private
exports.createBootcamps = asyncMiddleware(async (req, res, next) => {
  const bootcamp = await BootCamp.create(req.body);
  return res.status(201).json({ success: true, data: bootcamp });
});

// @desc   update a bootcamps
// route   PUT /api/v1/bootcamps/:id
// access  private
exports.updateBootcamp = asyncMiddleware(async (req, res, next) => {
  const bootcamp = await BootCamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return res.status(400).json({
      success: false,
      err: `Bootcamp not found with id of ${req.params.id}`,
    });
  }
  return res.status(200).json({ success: true, data: bootcamp });
});

// @desc   delete a bootcamps
// route   DELETE /api/v1/bootcamps/:id
// access  private
exports.deleteBootcamp = asyncMiddleware(async (req, res, next) => {
  const bootcamp = await BootCamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return res.status(400).json({
      success: false,
      err: `Bootcamp not found with id of ${req.params.id}`,
    });
  }
  return res.status(200).json({ success: true, data: {} });
});
