const User = require('../../models/User');

exports.userById = async(req,res)=>{
  const userId = req.user.id;

  try{
    const user = await User.findById({_id: userId});
    res.send(user);
  }
  catch{
    res.send("No user found!");
  }
};

exports.userbyName = async(req,res)=>{
  const name = req.body.name;

  try{
    const users = await User.find({first_name: name});
    res.send(users);
  }
  catch{
    res.send("No user found with that name.");
  }
};

exports.userLists =  async (req,res)=>{
  const userId = req.user.id;

  try{
    const user = await User.findById(userId).populate({path: 'lists'});
    res.send(user.lists);
  }
  catch(err){
    res.send("Cannot find the resources");
    console.log(err);
  }
};

exports.editUser = async(req,res)=>{
  const userId = req.user.id;
  const data = req.body;
  // if(data.email){
  //   res.status(422).send({error: "Email cannot be updated once set"});
  // }

  try{
    const user = await User.findByIdAndUpdate({_id: userId}, data, {new: true});
    res.send(user);
  }
  catch(err){
    res.send("Cannot update user at the moment");
    console.log(err);
  }
};

exports.removeUser = async(req,res)=>{
  const userId = req.user.id;
  
  try{
    await User.remove({_id: userId});
    res.send("The user is successfully deleted");
  }
  catch(err){
    res.send("Cannot remove user.");
    console.log(err);
  }
};