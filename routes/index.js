const categoryroute = require('./categoryRoute');
const productRouter = require('./productRoute');
const userRouter = require('./userRoute');

exports.setRoute = (app) => {
  app.use('/api/category', categoryroute);
  app.use('/api/user', userRouter);
  app.use('/api/product',productRouter)
};
