const passportService = require('../services/passport');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const listRoutes = require('./listRoutes');
const itemRoutes = require('./itemRoutes');

module.exports = (app) =>{
  authRoutes(app);
  userRoutes(app);
  listRoutes(app);
  itemRoutes(app);
}