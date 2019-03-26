const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name : String,
  url : String,
  addedOn: {
    type: Date,
    default: new Date()
  }
});

module.exports = ItemSchema;
