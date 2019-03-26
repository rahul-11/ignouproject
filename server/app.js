const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const keys = require('./config/keys');
const app = express();

const User = require('./models/User');



mongoose.Promise = global.Promise;
try{
  mongoose.connect(keys.mongoURI);
}
catch(err){
  console.log("Cannot connect to MongoDB");
}

app.use(bodyParser.json());
app.use(cors());

require('./routes')(app);

module.exports = app;