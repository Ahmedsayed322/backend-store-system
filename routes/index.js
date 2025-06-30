
const categoryroute = require('./categoryRoute');

exports.setRoute = (app) => {
  app.use('/api/category', categoryroute);
};
