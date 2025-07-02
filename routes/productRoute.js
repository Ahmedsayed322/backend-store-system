// routes/productRoutes.js
const express = require('express');
const multipleUpload = require('../middlewares/uploads');
const { userAuth, adminOnly } = require('../middlewares/auth');
const { addProduct, getProduct } = require('../controllers/productController');

const productRouter = express.Router();

productRouter.post('/add', userAuth, adminOnly, multipleUpload, addProduct);
productRouter.get('/:id', userAuth, getProduct);
module.exports = productRouter;
