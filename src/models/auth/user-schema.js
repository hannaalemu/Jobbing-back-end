/* eslint-disable no-shadow */

'use strict';

const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'jobbingisawesome';
// Hanna - this is the user mongoose schema

const user = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['admin', 'editor', 'user'],
  },
});

// Hanna - this is the capabilities of users

const capabilities = {
  user: ['create', 'read', 'update', 'delete'],
};

// Hanna - we are going to hash the password before saving it using bcrypt, salt rounds=10

user.pre('save', async function hashPassword() {
  if (this.isModified('passwprd')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

user.statics.authenticateToken = function findUser(token) {
  try {
    const parsedToken = jwt.verify(token, SECRET);

    const query = { _id: parsedToken.id };
    return this.findOne(query);
  } catch (error) {
    throw new Error('Invalid Token'); 
  }
};

// Hanna -----------------------------Basic Authentication-------------

user.statics.authenticateBasic = function getQuery(auth) {
  const query = { username: auth.usermane };

  return this.findOne(query)
    .then((user) => user && user.comparePasswod(auth.password))
    .catch((error) => { throw error; });
};

user.methods.comparePasswod = function compare(password) {
  return bcrypt.compare(password, this.password)
    .then((valid) => (valid ? this : null));
};

user.methods.generateToken = function getToken(type) {
  const token = {
    id: this._id,
    capabilities: capabilities[this.role],
    type: type || 'user',
  };

  return jwt.sign(token, SECRET);
};


// Hanna ------------------------------Bearer AUthentication --------------------
user.methods.can = function checkCapability(capability) {
  return capabilities[this.role].includes(capability);
};

module.exports = mongoose.model('user', user);
