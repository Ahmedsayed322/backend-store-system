const { cartRouter } = require('./cartRoute');
const categoryroute = require('./categoryRoute');
const productRouter = require('./productRoute');
const { reviewRouter } = require('./reviewRoute');
const userRouter = require('./userRoute');

exports.setRoute = (app) => {
  app.use('/api/category', categoryroute);
  app.use('/api/user', userRouter);
  app.use('/api/products', productRouter);
  app.use('/api/review', reviewRouter);
  app.use('/api/cart', cartRouter);
};
