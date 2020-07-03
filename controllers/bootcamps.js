const BootCamp = require('../model/BootCamp');
const asyncMiddleware = require('../middleware/async');
const geocoder = require('../utils/geocoder');

// @desc   get all bootcamps
// route   GET /api/v1/bootcamps
// access  public
exports.getBootcamps = asyncMiddleware(async (req, res, next) => {
  // copy req query
  const reqQuery = {
    ...req.query,
  };

  // removable fields
  const removeFields = ['select', 'sort'];

  // delete from reqQuery
  removeFields.forEach((params) => delete reqQuery[params]);

  console.log(reqQuery);

  // select query
  let queryStr = JSON.stringify(reqQuery);

  // create operators
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`,
  );

  // finding resources
  let query = BootCamp.find(JSON.parse(queryStr));

  // select fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    console.log(fields);
    query = query.select(fields);
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    console.log(sortBy);
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  const bootcamps = await query;
  return res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
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
