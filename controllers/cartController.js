const asyncHandler = require('express-async-handler');
const { Cart } = require('../models/cartModel');
const { Product } = require('../models/productModel');
const ApiError = require('../utils/apiError');
const { default: mongoose } = require('mongoose');

exports.addToCart = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    return next(new ApiError('Product not found', 404));
  }

  if (!req.body.color) {
    if (product.colors && product.colors.length > 0) {
      req.body.color = product.colors[0];
    } else {
      return next(new ApiError('Product has no colors available', 400));
    }
  }

  const colorExists = product.colors.some(
    (color) => color.toString() === req.body.color.toString()
  );
  if (!colorExists) {
    return next(new ApiError('Color not available for this product', 400));
  }

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = new Cart({
      user: req.user._id,
      cartitems: [],
    });
  }

  const existingItem = cart.cartitems.find(
    (item) =>
      item.product.toString() === id.toString() && item.color === req.body.color
  );
  const quantity =
    req.body.quantity && req.body.quantity > 0 ? req.body.quantity : 1;
  if (existingItem) {
    const reqQuntity = existingItem.quantity + quantity;
    if (reqQuntity > product.quantity) {
      return next(new ApiError('Quantity exceeds available stock', 400));
    }
    existingItem.quantity += quantity;
    existingItem.price = existingItem.quantity * product.price;
    existingItem.priceafterdiscount =
      (product.price - product.discount) * existingItem.quantity;
  } else {
    if (quantity > product.quantity) {
      return next(new ApiError('Quantity exceeds available stock', 400));
    }
    cart.cartitems.push({
      product: id,
      quantity: quantity,
      color: req.body.color,
      price: product.price * quantity,
      priceafterdiscount: (product.price - product.discount) * quantity,
    });
  }

  await cart.save();
  //   const updatedCart = await Cart.findById(cart._id);
  return res.status(201).json({
    status: 'success',
    data: cart,
  });
});
