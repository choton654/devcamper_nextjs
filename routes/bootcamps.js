const router = require('express').Router();
const {
  getBootcamps,
  getBootcamp,
  createBootcamps,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
} = require('../controllers/bootcamps');
const courseRouter = require('./courses');

router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/').get(getBootcamps).post(createBootcamps);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
