const passport = require('passport');
const listController = require('./controllers/listController');

const requireAuth = passport.authenticate('jwt', {session: false});

module.exports = app =>{
  // Create new list using id of user
  app.post('/api/list/new', requireAuth, listController.createList);

  // Get the List by list_id using listId
  app.get('/api/list/:listId', requireAuth, listController.listById);

  // Update the list using listId and data from req.body
  app.put('/api/list/:listId', requireAuth, listController.updateList);

  // Delete the list using listId
  app.delete('/api/list/:listId', requireAuth, listController.deleteList);
}
