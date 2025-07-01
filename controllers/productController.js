const asyncHandler = require('express-async-handler');
const { Product } = require('../models/productModel');
const Category = require('../models/categoryModel');
const ApiError = require('../utils/apiError');
const { deleteUploadedFiles } = require('./factoryController');

exports.addProduct = asyncHandler(async (req, res, next) => {
  const images = req.files?.images || [];
  const coverImage = req.files?.coverImage || [];

  const imageUrls = images.map((file) => ({
    img: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`,
  }));
  if (coverImage.length !== 1) {
    deleteUploadedFiles([...images, ...coverImage]);
    return next(new ApiError('Exactly one cover image is required', 400));
  }

  const check = await Category.findOne({ name: req.body.category });
  if (!check) {
    deleteUploadedFiles([...images, ...coverImage]);
    return next(new ApiError('Category not found in database', 404));
  }
  const newProduct = new Product({
    ...req.body,
    images: imageUrls,
    coverImage: `${req.protocol}://${req.get('host')}/uploads/${
      coverImage[0].filename
    }`,
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
