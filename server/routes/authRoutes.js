const Authentication = require('./controllers/authentication');
const passport = require('passport');


// const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});

module.exports = (app)=>{
  app.post('/api/signup', Authentication.signup);
  app.post('/api/signin', requireLogin, Authentication.signin);
}