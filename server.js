const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const dotenv = require('dotenv');
const morgan = require('morgan');
const dbConnect = require('./config/db');

// load vars
dotenv.config({ path: './config/.env' });

const port = process.env.PORT || 3000;

dbConnect();

// route files
const bootcamps = require('./routes/bootcamps');

app.prepare().then(() => {
  const server = express();

  // body parser
  server.use(express.json());

  // dev logging middleware
  server.use(morgan('dev'));

  // mount routes
  server.use('/api/v1/bootcamps', bootcamps);

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`server is running on port ${port}`);
  });
});
