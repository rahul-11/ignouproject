const List = require('../../models/List');

exports.createItem = async(req,res)=>{
  const {listId} = req.params;
  const {name, url=null} = req.body;
  
  try{
    const list = await List.findById({_id: listId});
    list.items.push({name: name, url: url});      // cannot cast String to _id
    const updatedList = await list.save();
    res.json(updatedList);
  }
  catch(err){
    res.send("Cannot add the item to list");
    console.log(err);
  }
};

exports.deleteItem = async(req,res)=>{
  const {listId} = req.params;
  const {itemId} = req.body;
  try{
    const list = await List.findOneAndUpdate(
      {_id: listId},
      { $pull: { items:{ _id: itemId }}},
      {new: true}
    );

    res.send(list);
  }
  catch(err){
    res.send("Cannot delete the item");
    console.log(err);
  }
};