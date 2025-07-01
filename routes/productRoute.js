// routes/productRoutes.js
const express = require('express');
const multipleUpload = require('../middlewares/uploads');
const { userAuth, adminOnly } = require('../middlewares/auth');
const { addProduct } = require('../controllers/productController');

const productRouter = express.Router();

productRouter.post('/add', userAuth, adminOnly, multipleUpload, addProduct);
module.exports = productRouter;
