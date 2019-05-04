const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const keys = require('./config/keys');
const app = express();

const User = require('./models/User');

const prod = require('./config/prod');

mongoose.Promise = global.Promise;
const mongoUri = keys.mongoURI;
mongoose.connect(mongoUri+"/worthero", {useCreateIndex: true})
.then(()=> console.log("MogoDB connected!"))
.catch(err => console.log(err));


app.use(bodyParser.json());
app.use(cors());

require('./routes')(app);

module.exports = app;