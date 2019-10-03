'use strict';

const schema = require('./job-schema');
const MongooseModel = require('../mongoose-model');

class Jobs extends MongooseModel { }

module.exports = new Jobs(schema);
