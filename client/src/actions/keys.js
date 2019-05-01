if(process.env.WEB_ENV){
  if(process.env.WEB_ENV === 'prod'){
    module.exports = {
      baseUrl : '/api'
    }
  }
}

else{
  module.exports = {
    baseUrl : "/api"
  }
}

/**
 * This is the temporary solution for making requests 
 * to the backend in production environment.
 * -> Need to implement the Environment variables.
 *  */
