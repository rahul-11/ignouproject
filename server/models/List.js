const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ListSchema = require('./Schemas/listSchema');

ListSchema.pre('remove', async function(next){
  const User = mongoose.model('user');
  const user = await User.findById({_id: this.user._id});
  const listInstance = user.lists.filter(list => list._id === this._id);
  listInstance.remove();
  user.save();
  next();
})

const List = mongoose.model('list', ListSchema);

module.exports = List;
