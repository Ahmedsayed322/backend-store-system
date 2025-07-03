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
////////////////////////////////////////////////////////////////////////////////
exports.removeProductFromCart = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const color = req.body.color;
  if (!color) {
    return next(new ApiError('Color is required', 400));
  }
  const cart = await Cart.findOne({
    user: req.user._id,
    'cartitems.product': id,
    'cartitems.color': color,
  });
  if (!cart) {
    return next(new ApiError('product not found', 404));
  }
  const newCartItems = cart.cartitems.filter((i) => {
    return !(i.product.toString() === id.toString() && i.color === color);
  });
  cart.cartitems = newCartItems;
  await cart.save();
  return res.status(200).json({
    status: 'success',
    data: cart,
  });
});
exports.clearCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });
  cart.cartitems = [];
  await cart.save();
  return res.status(200).json({
    status: 'success',
    data: cart,
  });
});
exports.getCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate({
    path: 'cartitems.product',
    select: 'title price coverImage',
  });
  res.status(200).json({
    status: 'success',
    data: cart,
  });
});
