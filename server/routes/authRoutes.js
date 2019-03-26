const Authentication = require('./controllers/authentication');
const passport = require('passport');


// const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});

module.exports = (app)=>{
  app.post('/signup', Authentication.signup);
  app.post('/signin', requireLogin, Authentication.signin);
}