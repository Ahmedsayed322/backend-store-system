const express = require('express');
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteCategoryById,
  updateCategory,
} = require('../controllers/categoryController');
const { userAuth, adminOnly } = require('../middlewares/auth');

const categoryroute = express.Router();
categoryroute.post('admin/add', userAuth, adminOnly, createCategory);
categoryroute.get('/', getAllCategories);
categoryroute.get('/:id', getCategoryById);
categoryroute.delete(
  '/admin/delete/:id',
  userAuth,
  adminOnly,
  deleteCategoryById
);
categoryroute.patch('/admin/update/:id', userAuth, adminOnly, updateCategory);

module.exports = categoryroute;
