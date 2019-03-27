if(process.env.NODE_ENV === 'production'){
  module.exports = require('./prod');
}
if(process.env.NODE_ENV === 'ci'){
  module.exports = {
    mongoURI: process.env.MONGOURI,
    secret: "ncdrejbgklrcibewriobfklaca"
  }
}
else {
  module.exports = require('./dev');
}
   


