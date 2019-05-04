const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const User = require('../models/User');
const keys = require('../config/keys');

const localOptions = {usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, async function(email, password, done){
  try{
    const user = await User.findOne({email: email.toLowerCase()});
    if(!user){ return done(null, false)};

    user.comparePassword(password, function(err, isMatch){
      if(err){ return done(err)};
      
      if(!isMatch){ return done(null, false) };
      
      return done(null, user);
    });
  }
  catch(err){
    done(err, false);
  }
}) 


// Token authentication
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: keys.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, async function(payload,done){
  try{
    const user = await User.findById(payload.sub);
    if(user){
      done(null, user)
    }
    else{
      done(null, false);
    }
  }
  catch(err){
    done(err, false);
  }
});

passport.use(jwtLogin);
passport.use(localLogin);