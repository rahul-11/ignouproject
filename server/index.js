const app = require('./app');

const PORT = 5000;
const HOST = '127.0.0.1';

app.listen(PORT, ()=>{
  console.log("Worthero on : "+PORT)
})
