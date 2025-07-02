// routes/productRoutes.js
const express = require('express');
const multipleUpload = require('../middlewares/uploads');
const { userAuth, adminOnly } = require('../middlewares/auth');
const {
  addProduct,
  getProduct,
  editProduct,
} = require('../controllers/productController');

const productRouter = express.Router();

productRouter.post('/add', userAuth, adminOnly, multipleUpload, addProduct);
productRouter.patch(
  '/edit/:id',
  userAuth,
  adminOnly,
  multipleUpload,
  editProduct
);
productRouter.get('/:id', getProduct);
module.exports = productRouter;
