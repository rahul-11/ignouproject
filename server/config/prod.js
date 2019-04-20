module.exports ={
  mongoURI: String(`mongodb://${process.env.MONGOHOST}:${process.env.MONGOPORT}/${process.env.MONGODBNAME}`),
  secret: "ncdrejbgklrcibewriobfklaca"
}

/* 
  format of mongoDB uri:  
  mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
  example:
  `mongodb://
    ${process.env.MONGOUSER}:${process.env.MONGOPASS}
    @${process.env.MONGOHOST}:${process.env.MONGOPORT}
    /${process.env.DBNAME}`

 */