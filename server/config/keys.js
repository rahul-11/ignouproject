if(process.env.NODE_ENV){
  if(process.env.NODE_ENV == 'prod'){
    module.exports = require('./prod');
  }
  
  else if(process.env.NODE_ENV = 'ci'){
    module.exports = {
      mongoURI: process.env.MONGOURI,
      secret: "scewbriugtv877tg4ibtg0ye32h3rof"
    }
  }

}
else{
  module.exports = require('./dev');
}

/*
  To run node instance with manually providing the environment variables run:
  NODE_ENV=prod MONGOHOST=localhost MONGOPORT=27017 MONGODBNAME=worthero node index.js

*/