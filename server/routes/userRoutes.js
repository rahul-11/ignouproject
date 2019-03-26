const passport = require('passport');
const userController = require('./controllers/userController');

const requireAuth = passport.authenticate('jwt', {session: false});

module.exports = app =>{
  // Get the user using id
  app.get('/api/user', requireAuth, userController.userById);

  // Find and get the user by name
  app.get('/api/search', requireAuth, userController.userbyName);

  // Get the all lists of user by id
  app.get('/api/user/lists', requireAuth, userController.userLists);
  
  // Update the user
  app.put('/api/user', requireAuth, userController.editUser);
  
  // Delete the user by id
  app.delete('/api/user', requireAuth, userController.removeUser);
}

/**
 * The remove route defined here calls the middleware defined in User model 
 * file, automatically. 
 * That middleware deletes all the lists associated with the user first.
 */