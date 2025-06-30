const Category = require('../models/categoryModel');
const asyncHandler = require('express-async-handler');
const factory = require('./factoryController');
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
