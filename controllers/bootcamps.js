// @desc   get all bootcamps
// route   GET /api/v1/bootcamps
// access  public
exports.getBootcamps = (req, res, next) => {
  return res.status(200).json({ success: true, msg: 'Get all bootcamps' });
};

// @desc   get single bootcamps
// route   GET /api/v1/bootcamps/:id
// access  public
exports.getBootcamp = (req, res, next) => {
  return res
    .status(200)
    .json({ success: true, msg: `get bootcamp ${req.params.id}` });
};

// @desc   create bootcamps
// route   POSt /api/v1/bootcamps
// access  private
exports.createBootcamps = (req, res, next) => {
  return res.status(200).json({ success: true, msg: 'create a bootcamp' });
};

// @desc   update a bootcamps
// route   PUT /api/v1/bootcamps/:id
// access  private
exports.updateBootcamp = (req, res, next) => {
  return res
    .status(200)
    .json({ success: true, msg: `update bootcamp ${req.params.id}` });
};

// @desc   delete a bootcamps
// route   DELETE /api/v1/bootcamps/:id
// access  private
exports.deleteBootcamp = (req, res, next) => {
  return res
    .status(200)
    .json({ success: true, msg: `delete bootcamp ${req.params.id}` });
};
