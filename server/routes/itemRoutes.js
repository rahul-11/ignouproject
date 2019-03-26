const passport = require('passport');
const itemController = require('./controllers/itemController');

const requireAuth = passport.authenticate('jwt', {session: false}); 

module.exports = app =>{
  
  // Add new Items to the lists
  app.post('/api/list/:listId/new', requireAuth, itemController.createItem);

  // Delete the item in the list
  app.delete('/api/list/:listId/item', requireAuth, itemController.deleteItem);
};
