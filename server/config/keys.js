if(process.env.NODE_ENV){
  if(process.env.NODE_ENV == 'prod'){
    module.exports = require('./prod');
  }
  else{
    module.exports = require('./dev');
  }
}
else{
  module.exports = require('./dev');
}

/*
  To run node instance with manually providing the environment variables run:
  NODE_ENV=prod MONGOHOST=localhost MONGOPORT=27017 MONGODBNAME=worthero node index.js

*/