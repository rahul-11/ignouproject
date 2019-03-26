const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ItemSchema = require('../Item');

const ListSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String,
    required: "List name cannot be blank"
  },
  access: {
    type: String,
    default: "public"
  },
  items : [ItemSchema],
  createdOn: {
    type: Date,
    default: new Date()
  }
});

module.exports = ListSchema;