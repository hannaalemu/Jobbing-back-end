'use strict';

// eslint-disable-next-line no-unused-vars
module.exports = (request, response, next) => {
  response.status(500);
  response.send({ Error: 'Sorry, something went wrong' });
};
