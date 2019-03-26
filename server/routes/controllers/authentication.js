const jwt = require('jwt-simple');
const User = require('../../models/User');
const keys = require('../../config/keys');

function tokenForUser(user){
  const timeStamp = new Date().getTime();
  return jwt.encode({sub: user.id, iat: timeStamp}, keys.secret);
}

exports.signup = async (req, res, next)=>{
  const {first_name, last_name ,email, password} = req.body;

  if(!first_name || !last_name || !email || !password){
    res.status(422).send({error: "You must provide Name, Email, Password"});
  }

  try{
    const user = await User.findOne({email: email});

    if(user){
      res.status(422).send({error: "Email is already in use, Signin instead"});
    }

    const newUser = new User({
      first_name : first_name,
      last_name: last_name,
      email: email,
      password: password
    });

    await newUser.save();
    res.json({token: tokenForUser(newUser)});
  }
  catch(err){
    next(err);
  }
};

exports.signin = async (req, res, next)=>{
  if(req.err){
    res.json({error: "Error occured!"})
  }
  else if(!req.user){
    res.json({error: "Credentials does not match"})
  };
  res.send({token: tokenForUser(req.user)});
};