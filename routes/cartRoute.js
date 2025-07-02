const express = require('express');
const { userAuth } = require('../middlewares/auth');
const { addToCart } = require('../controllers/cartController');
const cartRouter = express.Router();

cartRouter.post('/add/:id', userAuth, addToCart);
module.exports = {
  cartRouter,
};
