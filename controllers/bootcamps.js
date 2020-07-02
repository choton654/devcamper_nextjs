const BootCamp = require('../model/BootCamp');

// @desc   get all bootcamps
// route   GET /api/v1/bootcamps
// access  public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await BootCamp.find();
    return res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch (error) {
    return res.status(400).json({ success: false, msg: error.message });
  }
};

// @desc   get single bootcamps
// route   GET /api/v1/bootcamps/:id
// access  public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await BootCamp.findById(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    return res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    return res.status(400).json({ success: false, msg: error.message });
  }
};

// @desc   create bootcamps
// route   POSt /api/v1/bootcamps
// access  private
exports.createBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await BootCamp.create(req.body);
    return res.status(201).json({ success: true, data: bootcamp });
  } catch (error) {
    return res.status(400).json({ success: false, msg: error.message });
  }
};

// @desc   update a bootcamps
// route   PUT /api/v1/bootcamps/:id
// access  private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await BootCamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    return res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    return res.status(400).json({ success: false, msg: error.message });
  }
};

// @desc   delete a bootcamps
// route   DELETE /api/v1/bootcamps/:id
// access  private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await BootCamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    return res.status(200).json({ success: true, data: {} });
  } catch (error) {
    return res.status(400).json({ success: false, msg: error.message });
  }
};
