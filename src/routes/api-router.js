'use strict';

const express = require('express');

//  Hanna - import express, and create a router

const apiRouter = express.Router();


// eslint-disable-next-line consistent-return
function handleGet(request, response, next) {
  if (request) {
    return response.send('Hello World!!!')
      .then(response.status(200))
      .catch((error) => next(error));
  }
}

apiRouter.get('/', handleGet);

module.exports = apiRouter;
