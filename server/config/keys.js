if(process.env.NODE_ENV === 'production'){
  module.exports = require('./prod');
}
if(process.env.NODE_ENV === 'ci'){
  module.exports = {
    mongoURI: "mongodb://mongodb:27017/worthero",
    secret: "ncdrejbgklrcibewriobfklaca"
  }
}
else {
  module.exports = require('./dev');
}
   


