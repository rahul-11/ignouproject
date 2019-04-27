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
