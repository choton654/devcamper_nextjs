const express = require('express');
const next = require('next');
const dotenv = require('dotenv');

const port = process.env.PORT || 3000;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// route files
const bootcamps = require('./routes/bootcamps');

app.prepare().then(() => {
  const server = express();

  // mount routes
  server.use('/api/v1/bootcamps', bootcamps);

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log(`server is running on port ${port}`);
  });
});
