/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */

'use strict';

// Hanna - this middleware sits between all authenticated requests and checks for auth credentials

const User = require('../src/models/auth/user-model');

module.exports = (capability) => {
  // Hanna - We check for basic or bearer auth
    
  return (request, response, next) => {
    function _authenticate(user) {
      if (user && (!capability || (user.can(capability)))) {
        request.user = user;
        request.token = user.generateToken();
        next();
      } else {
        _authError();
      }
    }

    function _authBasc(string) {
      const base64Buffer = Buffer.from(string, 'base64');
      const bufferString = base64Buffer.toString();
      const [username, password] = bufferString.split(':');
      const auth = { username, password };
                                        
      return User.authenticateBasic(auth) 
        .then((user) => _authenticate(user))
        .catch(_authError);
    }

    function _authBearer(authString) {
      return User.authenticateToken(authString)
        .then((user) => _authenticate(user))
        .catch(_authError);
    }
    
    try {
      const [authType, authString] = request.headers.authorization.split(/\s+/);
      
      switch (authType.toLowerCase()) {
      case 'basic':
        return _authBasc(authString);
      case 'bearer':
        return _authBearer(authString);
      default:
        return _authError();
      }
    } catch (error) {
      _authError();
    }
    function _authError() {
      next('Invalid User ID/Password');
    }
  };
};
