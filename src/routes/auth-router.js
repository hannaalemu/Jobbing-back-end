/* eslint-disable no-shadow */

'use strict';

const express = require('express');

const authRouter = express.Router();

const User = require('../models/auth/user-schema');
const auth = require('../../middleware/auth');

authRouter.post('/signup', (request, response, next) => {
  console.log(request.body);
  const user = new User(request.body);
  user.save()
    .then((user) => {
      request.token = user.generateToken();
      request.user = user;
      response.set('token', request.token);
      response.cookie('auth', request.token);
      response.send(request.token);
    })
    .catch((error) => next(error));
});


authRouter.post('/signin', auth(), (request, response, next) => {
  response.set('token', request.token);
  response.cookie('auth', request.token);
  response.send(request.token);
});

module.exports = authRouter;
