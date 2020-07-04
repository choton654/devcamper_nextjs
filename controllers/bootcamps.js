const path = require('path');
const BootCamp = require('../model/BootCamp');
const asyncMiddleware = require('../middleware/async');
const geocoder = require('../utils/geocoder');

// @desc   get all bootcamps
// route   GET /api/v1/bootcamps
// access  public
exports.getBootcamps = asyncMiddleware(async (req, res, next) => {
  return res.status(200).json(res.advancedResults);
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
  const bootcamp = await BootCamp.findById(req.params.id);

  if (!bootcamp) {
    return res.status(400).json({
      success: false,
      err: `Bootcamp not found with id of ${req.params.id}`,
    });
  }

  bootcamp.remove();

  return res.status(200).json({ success: true, data: {} });
});

// @desc   get bootcamps within a radius
// route   GET /api/v1/bootcamps/radius/:zipcode/:distance
// access  private
exports.getBootcampsInRadius = asyncMiddleware(async (req, res, next) => {
  const { zipcode, distance } = req.body;

  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  const radius = distance / 3963;

  const bootcamps = find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });
  return res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});

// @desc   upload photo
// route   PUT /api/v1/bootcamps/:id/photo
// access  private
exports.bootcampPhotoUpload = asyncMiddleware(async (req, res, next) => {
  const bootcamp = await BootCamp.findById(req.params.id);

  if (!bootcamp) {
    return res.status(400).json({
      success: false,
      err: `Bootcamp not found with id of ${req.params.id}`,
    });
  }

  if (!req.files) {
    return res.status(400).json({
      success: false,
      err: 'please upload a file',
    });
  }

  console.log(req.files);

  const file = req.files.file;

  if (!file.mimetype.startsWith('image')) {
    return res.status(400).json({
      success: false,
      err: 'please upload a image file',
    });
  }

  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return res.status(400).json({
      success: false,
      err: `please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
    });
  }

  // create a custome file
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        err: 'problem with file upload',
      });
    }

    await BootCamp.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({ success: true, data: file.name });
  });
});
