const asyncHandler = require('express-async-handler');
const { Product } = require('../models/productModel');
const ApiError = require('../utils/apiError');
const { Review } = require('../models/reviewModel');
const { updateRatings } = require('./factoryController');

exports.addReview = asyncHandler(async (req, res, next) => {
  const id = req.params.productid;
  const product = await Product.findById(id);
  if (!product) {
    return next(new ApiError('product not found', 404));
  }
  const check = await Review.findOne({ userId: req.user._id, productId: id });
  if (check) {
    return next(
      new ApiError('You have already commented on this product', 400)
    );
  }
  const review = new Review(req.body);
  if (!product.reviews) {
    product.reviews = [];
  }

  review.userId = req.user._id;
  review.name = req.user.name;
  review.productId = product._id;
  await review.save();
  product.reviews.push(review._id);
  const populatedProduct = await product.populate({
    path: 'reviews',
    select: 'rating',
  });
  updateRatings(product, populatedProduct);
  await product.save();
  res.status(201).json({
    status: 'success',
    data: review,
  });
});
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const id = req.params.reviewid;
  const product = await Product.findOne({ reviews: id });
  if (!product) {
    return next(new ApiError('Review not found'), 404);
  }
  const review = await Review.findOneAndDelete({
    _id: id,
    userId: req.user._id,
    productId: product._id,
  });
  if (!review) {
    return next(
      new ApiError('You do not have permission to delete this review', 403)
    );
  }
  // product.reviews = product.reviews.filter(
  //   (i) => i.toString() !== id.toString()
  // );
  product.reviews.pull(id);
  const populatedProduct = await product.populate({
    path: 'reviews',
    select: 'rating',
  });

  updateRatings(product, populatedProduct);

  await product.save();
  res.status(200).json({
    status: 'success',
    message: 'comment has been deleted',
  });
});
exports.getReviews = asyncHandler(async (req, res, next) => {
  const id = req.params.productid;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const reviews = await Review.find({ productId: id })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalReviews = await Review.countDocuments({ productId: id });

  res.status(200).json({
    status: 'success',
    count: reviews.length,
    total: totalReviews,
    currentPage: page,
    totalPages: Math.ceil(totalReviews / limit),
    data: reviews,
  });
});
exports.editReview = asyncHandler(async (req, res, next) => {
  const id = req.params.reviewid;
  const review = await Review.findOneAndUpdate(
    {
      _id: id,
      userId: req.user._id,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!review) {
    return next(new ApiError('Review not found', 404));
  }

  const product = await Product.findOne({ _id: review.productId });
  if (!product) {
    return next(new ApiError('Product for this review not found', 404));
  }
  const populatedProduct = await product.populate({
    path: 'reviews',
    select: 'rating',
  });

  updateRatings(product, populatedProduct);
  await product.save();
  res.status(200).json({
    status: 'success',
    data: review,
  });
});
