'use strict';

// eslint-disable-next-line no-unused-vars
module.exports = (request, response, next) => {
  response.status(400);
  response.send({ Error: 'Sorry, Resource not found' });
};
