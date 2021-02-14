const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const dotenv = require('dotenv');
const morgan = require('morgan');
const dbConnect = require('../config/db');
const errorHandler = require('../middleware/error');
const cookieParser = require('cookie-parser');

// load vars
dotenv.config({ path: './config/.env' });

const port = process.env.PORT || 3000;

dbConnect();

// route files
const bootcamps = require('../routes/bootcamps');
const courses = require('../routes/courses');
const auth = require('../routes/auth');
const user = require('../routes/user');
const reviews = require('../routes/reviews');

app.prepare().then(() => {
  const server = express();

  // body parser
  server.use(express.json());

  server.use(cookieParser());

  // dev logging middleware
  server.use(morgan('dev'));

  // file upload
  server.use(fileUpload());

  server.use(express.static(path.join(__dirname, 'public')));

  // mount routes
  server.use('/api/v1/bootcamps', bootcamps);
  server.use('/api/v1/courses', courses);
  server.use('/api/v1/auth', auth);
  server.use('/api/v1/users', user);
  server.use('/api/v1/reviews', reviews);

  server.use(errorHandler);

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`server is running on port ${port}`);
  });
});
