'use strict';

const mongoose = require('mongoose');

const job = mongoose.Schema({ 
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  dateApplied: {
    type: String,
    required: true,
  },
  jobListingUrl: {
    type: String,
    required: false,
  },
  companyUrl: {
    type: String,
    required: false,
  },


});

module.exports = mongoose.model('job', job);
