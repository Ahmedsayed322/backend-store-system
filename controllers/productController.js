const asyncHandler = require('express-async-handler');
const { Product } = require('../models/productModel');
const Category = require('../models/categoryModel');
const ApiError = require('../utils/apiError');
const { deleteUploadedFiles } = require('./factoryController');

exports.addProduct = asyncHandler(async (req, res, next) => {
  const images = req.files.images || [];
  const coverImage = req.files.coverImage || [];

  if (coverImage.length !== 1) {
    return next(new ApiError('Exactly one cover image is required', 400));
  }

  // روابط الصور على Cloudinary
  const imageUrls = images.map((file) => ({
    img: file.path, // Cloudinary URL
  }));

  const check = await Category.findOne({ name: req.body.category });
  if (!check) {
    return next(new ApiError('Category not found in database', 404));
  }

  const newProduct = new Product({
    ...req.body,
    images: imageUrls,
    coverImage: coverImage[0].path, // Cloudinary URL
    category: check._id,
  });

  await newProduct.save();
  const populatedProduct = await newProduct.populate('category');

  res.status(201).json({
    status: 'success',
    data: {
      product: populatedProduct,
    },
  });
});
