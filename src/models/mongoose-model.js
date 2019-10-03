/* eslint-disable new-cap */

'use strict';

// Hanna  - this file lets us manipulate the mongo db by using methods to CRUD

class DataModel {
  constructor(schema) {
    this.schema = schema;
  } 

  get(id) {
    const query = id ? { _id: id } : {};
    return this.schema.find(query);
  }

  post(record) {
    const newRecord = new this.schema(record);
    return newRecord.save();
  }

  put(id, record) {
    const filter = { _id: id };
    const update = record;

    return this.schema.findOneAndUpdate(filter, update);
  }

  delete(id) {
    const filter = { _id: id };
    return this.schema.findOneAndDelete(filter);
  }
}

module.exports = DataModel;
