if(process.env.NODE_ENV){
  if(process.env.NODE_ENV === 'production'){
    module.exports = {
      baseUrl : '/api'
    }
  }
  else{
    module.exports = {
      baseUrl : "http://localhost/api"
    }
  }
}

else{
  module.exports = {
    baseUrl : "http://localhost/api"
  }
}

/**
 * For creating and accessing other environment variables:
 *  prefix with REACT_APP_ 
 *  NODE_ENV is default environment variable
 *  start -> 'development'
 *  test -> 'test'
 *  build -> 'production'
 *  */
