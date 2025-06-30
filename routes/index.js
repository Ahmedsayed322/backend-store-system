const categoryroute = require('./categoryRoute');
const userRouter = require('./userRoute');

exports.setRoute = (app) => {
  app.use('/api/category', categoryroute);
  app.use('/api/', userRouter);
};
