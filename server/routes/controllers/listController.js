const User = require('../../models/User');
const List = require('../../models/List');

exports.createList = async (req,res)=>{
  const userId = req.user.id;
  const {list_name, access} = req.body;

  try{
    let list;
    if(access){
      list = new List({ name: list_name, access: access });
    }
    else{
      list = new List({ name: list_name });
    }

    list.user = userId;
    const saved_list = await list.save();
    const user = await User.findById(userId);
   
    await user.lists.push(saved_list);    // Hook the list to the user
    await user.save();
   
    res.status(200).send(saved_list);
  }
  catch(err){
    res.status(422).send("Cannot add the list");
    console.log(err);
  }
};

exports.listById = async(req,res)=>{
  const {listId} = req.params;

  try{
    const list = await List.findById({_id: listId});
    res.send(list);
  }
  catch(err){
    res.send("No list found!");
    console.log(err);
  }
};

exports.updateList = async(req,res)=>{
  const {listId} = req.params;
  const data = req.body;

  try{
    const updatedList = await List.findByIdAndUpdate({_id: listId}, data, {new: true});
    res.send(updatedList);  
  }
  catch(err){
    res.send("Cannot update the list");
    console.log(err);
  }
};

exports.deleteList = async(req,res)=>{
  const {listId} = req.params;

  try{
    await List.remove({_id: listId});
    res.send("We deleted the list");      
  }
  catch(err){
    res.send("Cannot delete the list");
    console.log(err);
  }
};