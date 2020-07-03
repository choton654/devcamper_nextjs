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
  const removeFields = ['select', 'sort', 'page', 'limit'];

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
  let query = BootCamp.find(JSON.parse(queryStr)).populate('courses');

  // select fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await BootCamp.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // executing query
  const bootcamps = await query;

  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  return res.status(200).json({
    success: true,
    count: bootcamps.length,
    pagination,
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
