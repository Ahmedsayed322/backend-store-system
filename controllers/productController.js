const asyncHandler = require('express-async-handler');
const { Product } = require('../models/productModel');
const Category = require('../models/categoryModel');
const ApiError = require('../utils/apiError');

exports.addProduct = asyncHandler(async (req, res, next) => {
  const images = req.files.images || [];
  const coverImage = req.files.coverImage || [];
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
  if (req.body.colors) {
    req.body.colors = req.body.colors
      .split('-')
      .map((c) => c.replace(/\s+/g, ''))
      .filter((c) => c.length > 0);
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

exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id });
  if (!product) {
    return next(new ApiError('Product not found in database', 404));
  }
  // const populatedProduct = await product.populate('reviews');
  res.status(200).json({
    status: 'success',
    data: {
      product: populatedProduct,
    },
  });
});
/////////////////////////////////////////////////////////////
// exports.addProduct = asyncHandler(async (req, res, next) => {
//   const images = req.files.images || [];
//   const coverImage = req.files.coverImage || [];

//   if (coverImage.length !== 1) {
//     return next(new ApiError('Exactly one cover image is required', 400));
//   }

//   // روابط الصور على Cloudinary
//   const imageUrls = images.map((file) => ({
//     img: file.path, // Cloudinary URL
//   }));

//   const check = await Category.findOne({ name: req.body.category });
//   if (!check) {
//     return next(new ApiError('Category not found in database', 404));
//   }

//   const newProduct = new Product({
//     ...req.body,
//     images: imageUrls,
//     coverImage: coverImage[0].path, // Cloudinary URL
//     category: check._id,
//   });

//   await newProduct.save();
//   const populatedProduct = await newProduct.populate('category');

//   res.status(201).json({
//     status: 'success',
//     data: {
//       product: populatedProduct,
//     },
//   });
// });
