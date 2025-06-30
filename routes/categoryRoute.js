const express = require('express');
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteCategoryById,
  updateCategory,
} = require('../controllers/categoryController');

const categoryroute = express.Router();
categoryroute.post('/add', createCategory);
categoryroute.get('/', getAllCategories);
categoryroute.get('/:id', getCategoryById);
categoryroute.delete('/delete/:id', deleteCategoryById);
categoryroute.patch('/update/:id', updateCategory);

module.exports = categoryroute;
