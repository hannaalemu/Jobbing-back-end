/* eslint-disable no-console */
const { server } = require('../src/app');
const supergoose = require('./supergoose.js');

const mockRequest = supergoose.server(server);

describe('api-server', () => {
  it('should respond to home route as proof of life', () => {
    return mockRequest
      .get('/')
      .then((results) => {
        expect(results.status).toBe(200);
      }).catch(console.error);
  });
});
