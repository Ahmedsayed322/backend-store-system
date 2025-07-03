const Category = require('../models/categoryModel');
const asyncHandler = require('express-async-handler');
const factory = require('./factoryController');
const ApiError = require('../utils/apiError');
//create category auth:admin
exports.createCategory = factory.createOne(Category);
//get all categories auth:user
exports.getAllCategories = factory.getAll(Category);
//find Category by id auth:user
exports.getCategoryById = factory.getOne(Category);
//delet Category by id auth:admin
exports.deleteCategoryById = factory.deleteOne(Category);
//update Category   auth:user
exports.updateCategory = factory.updateOne(Category);
exports.getByName = asyncHandler(async (req, res, next) => {
  const name = req.params.name;
  const category = await Category.findOne({ name: name });
  if (!category) {
    return next(new ApiError('category not Found', 404));
  }
  res.status(200).json(category);
});
