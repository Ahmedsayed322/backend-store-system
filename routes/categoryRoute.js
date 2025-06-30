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
categoryroute.post('/add', userAuth, adminOnly, createCategory);
categoryroute.get('/', getAllCategories);
categoryroute.get('/:id', getCategoryById);
categoryroute.delete('/delete/:id', userAuth, adminOnly, deleteCategoryById);
categoryroute.patch('/update/:id', userAuth, adminOnly, updateCategory);

module.exports = categoryroute;
