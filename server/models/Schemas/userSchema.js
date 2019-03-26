const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name : {
    type : String,
    required : "first_name is required"
  },
  last_name : {
    type : String,
    required : "last_name is required"
  },
  email : {
    type: String,
    required: "email is required"
  },
  password: {
    type: String,
    required: "password is required"
  },
  lists: [{
    type: Schema.Types.ObjectId,
    ref: 'list'
  }],
  country: {
    type: String,
    default: "India"
  },
  joinedOn: {
    type: Date,
    default: new Date()
  }
});

module.exports = UserSchema;