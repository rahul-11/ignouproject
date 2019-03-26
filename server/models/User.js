const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = require('./Schemas/userSchema');

UserSchema.pre('save', async function(next){
  const user = this;

  const existingUser = await User.findById(user._id);
  if(existingUser !== null){
    next();
  }

  try{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    next();
  }
  catch(err){
    next(err);
  }
})

UserSchema.pre('remove', async function(next){
  const List = mongoose.model('list');
  await List.remove({_id: {$in: this.lists}}); // Remove all the lists by grabing all ids in 'lists'
  next();
});

UserSchema.methods.comparePassword = async function(candidatePassword, callback){
  try{
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    callback(null, isMatch);
  }
  catch(err){
    callback(err);
  }
}


const User = mongoose.model('user', UserSchema);

module.exports = User;
