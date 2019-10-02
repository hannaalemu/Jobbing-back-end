'use strict';

const mongoose = require('mongoose');

const App = require('./src/app');

require('dotenv').config();

const MONGOOSE_URI = 'mongodb+srv://hanna9:estifaman9@cluster0-s90so.mongodb.net/test?retryWrites=true&w=majority';

// Hanna - connect to database
mongoose.connect(MONGOOSE_URI, { 
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// Hanna -host app on port 3000
App.start(process.env.PORT || 8080);
