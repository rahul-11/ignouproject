if(process.env.NODE_ENV){
  if(process.env.NODE_ENV === 'production'){
    module.exports = {
      baseUrl : '/api'
    }
  }
}

else{
  module.exports = {
    baseUrl : "http://localhost/api"
  }
}

/**
 * This is the temporary solution for making requests 
 * to the backend in production environment.
 * -> Need to implement the Environment variables.
 *  */
