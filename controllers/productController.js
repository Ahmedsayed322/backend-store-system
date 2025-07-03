const asyncHandler = require('express-async-handler');
const { Product } = require('../models/productModel');
const Category = require('../models/categoryModel');
const ApiError = require('../utils/apiError');
const fs = require('fs');
const path = require('path');
const { deleteUploadedFiles } = require('./factoryController');
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

  const category = await Category.findOne({ name: req.body.category });
  if (!category) {
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
    category: category._id,
  });
  await newProduct.save();
  category.products.push(newProduct._id);
  await category.save();
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
  const product = await Product.findByIdId(id);
  if (!product) {
    return next(new ApiError('Product not found in database', 404));
  }
  const populatedProduct = await product.populate('reviews');
  res.status(200).json({
    status: 'success',
    data: {
      product: populatedProduct,
    },
  });
});
exports.editProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return next(new ApiError('Product not found', 404));
  }

  const images = req.files?.images || [];
  const coverImage = req.files?.coverImage || [];

  // التحقق من صورة الغلاف
  if (coverImage.length > 1) {
    deleteUploadedFiles([...images, ...coverImage]);
    return next(new ApiError('Exactly one cover image is required', 400));
  }

  // التحقق من الفئة الجديدة
  if (req.body.category) {
    const category = await Category.findOne({ name: req.body.category });
    if (!category) {
      deleteUploadedFiles([...images, ...coverImage]);
      return next(new ApiError('Category not found in database', 404));
    }
    req.body.category = category._id;
  }

  // تنسيق الألوان
  if (req.body.colors) {
    req.body.colors = req.body.colors
      .split('-')
      .map((c) => c.replace(/\s+/g, ''))
      .filter((c) => c.length > 0);
  }

  // مسارات الصور الجديدة
  if (images.length > 0) {
    // حذف الصور القديمة من السيرفر
    if (product.images && product.images.length > 0) {
      product.images.forEach((imgObj) => {
        const filename = imgObj.img.split('/uploads/')[1];
        if (filename) {
          fs.unlink(path.join(__dirname, `../uploads/${filename}`), () => {});
        }
      });
    }

    req.body.images = images.map((file) => ({
      img: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`,
    }));
  }

  if (coverImage.length === 1) {
    // حذف صورة الغلاف القديمة
    if (product.coverImage) {
      const oldCover = product.coverImage.split('/uploads/')[1];
      if (oldCover) {
        fs.unlink(path.join(__dirname, `../uploads/${oldCover}`), () => {});
      }
    }

    req.body.coverImage = `${req.protocol}://${req.get('host')}/uploads/${
      coverImage[0].filename
    }`;
  }

  // تحديث المنتج
  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  }).populate('category reviews');

  res.status(200).json({
    status: 'success',
    data: {
      product: updatedProduct,
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
//////////////////////////////////////////////////////////////////////////////////
// exports.addProduct = asyncHandler(async (req, res, next) => {
//   const images = req.files.images || [];
//   const coverImage = req.files.coverImage || [];

//   if (coverImage.length !== 1) {
//     return next(new ApiError('Exactly one cover image is required', 400));
//   }

//   // روابط الصور على Cloudinary
//   const imageUrls = images.map((file) => ({
//     img: file.path,        // رابط الصورة
//     public_id: file.filename,
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
/////////////////////////////////////////////

// const cloudinary = require('cloudinary').v2;

// exports.editProduct = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;

//   const product = await Product.findById(id);
//   if (!product) {
//     return next(new ApiError('Product not found', 404));
//   }

//   const images = req.files?.images || [];
//   const coverImage = req.files?.coverImage || [];

//   if (coverImage.length > 1) {
//     return next(new ApiError('Exactly one cover image is required', 400));
//   }

//   // التحقق من الفئة
//   if (req.body.category) {
//     const category = await Category.findOne({ name: req.body.category });
//     if (!category) {
//       return next(new ApiError('Category not found in database', 404));
//     }
//     req.body.category = category._id;
//   }

//   // تنسيق الألوان
//   if (req.body.colors) {
//     req.body.colors = req.body.colors
//       .split('-')
//       .map((c) => c.replace(/\s+/g, ''))
//       .filter((c) => c.length > 0);
//   }

//   // حذف الصور القديمة من Cloudinary لو في صور جديدة
//   if (images.length > 0 && product.images.length > 0) {
//     for (const imgObj of product.images) {
//       if (imgObj.public_id) {
//         await cloudinary.uploader.destroy(imgObj.public_id);
//       }
//     }

//     // حفظ الصور الجديدة
//     req.body.images = images.map((file) => ({
//       img: file.path,
//       public_id: file.filename,
//     }));
//   }

//   // حذف صورة الغلاف القديمة لو تم رفع واحدة جديدة
//   if (coverImage.length === 1) {
//     if (product.coverImagePublicId) {
//       await cloudinary.uploader.destroy(product.coverImagePublicId);
//     }

//     req.body.coverImage = coverImage[0].path;
//     req.body.coverImagePublicId = coverImage[0].filename;
//   }

//   // التحديث في الداتا بيز
//   const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
//     new: true,
//     runValidators: true,
//   }).populate('category reviews');

//   res.status(200).json({
//     status: 'success',
//     data: {
//       product: updatedProduct,
//     },
//   });
// });
