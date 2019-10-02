'use strict';

process.env.SECRET = 'test';

const jwt = require('jsonwebtoken');

const { server } = require('../src/app');

const supergoose = require('./supergoose.js');

const mockRequest = supergoose.server(server);

const users = {
  admin: { username: 'admin', password: 'password', role: 'admin' },
  editor: { username: 'editor', password: 'password', role: 'editor' },
  user: { username: 'user', password: 'password', role: 'user' },
};

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('Auth Router', () => {
  Object.keys(users).forEach((userType) => {
    describe(`${userType} users`, () => {
      let id;
      
      it('can create one', () => {
        return mockRequest.post('/signup')
          .send(users[userType])
          .then((results) => {
            const token = jwt.verify(results.text, process.env.SECRET);
            id = token.id;
            // eslint-disable-next-line no-unused-vars
            const encodedToken = results.text;
            expect(token.id).toBeDefined();
          });
      });

      it('can signin with basic', () => {
        return mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password)
          .then((results) => {
            const token = jwt.verify(results.text, process.env.SECRET);
            expect(token.id).toEqual(id);
          });
      });
    });
  });
});
