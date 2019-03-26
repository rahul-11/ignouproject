const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const keys = require('./config/keys');
const app = express();

const User = require('./models/User');



mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);
app.use(bodyParser.json());
app.use(cors());

require('./routes')(app);

module.exports = app;