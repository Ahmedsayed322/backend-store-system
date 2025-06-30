//express setup
const express = require('express');
require('dotenv').config({ path: 'config.env' });
const app = express();
const PORT = process.env.PORT || 5000;
/////////////////////////////////////////////////////////////////////
//morgan setup
const morgan = require('morgan');

if (process.env.Node_ENV === 'development') {
  app.use(morgan('dev'));
}
console.log('mode:' + process.env.Node_ENV);
///////////////////////////////////////////////////////////////////////
//middleware

app.use(express.json());

//////////////////////////////////////////////////////////////////////
//databaseConnection
const { startConnection } = require('./config/database');
startConnection();
////////////////////////////////////////////////////////////////////
//routes

//////////////////////////////////////////////////
const { setRoute } = require('./routes');
const ErrorHandler = require('./middlewares/ErrorHandler');
setRoute(app);
app.use(ErrorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
