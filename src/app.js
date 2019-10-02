'use strict';

// Hanna - import dependecies

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Hanna - import error handling middleware
const notFound = require('../middleware/404');
const errorHandler = require('../middleware/500');

// Hanna - import all routes
const apiRouter = require('./routes/api-router');
const authRouter = require('./routes/auth-router');

// Hanna - instantiate app as a express server and use imports


const app = express();

// Hanna - this attaches the request to the body
app.use(express.json());


app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(morgan('dev'));
app.use(apiRouter);
app.use(authRouter);

// Hanna - create route for JSDocs
app.use('/docs', express.static('docs'));

app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`HELLO! Server is Up on PORT ${port}`);
    });
  },
};
