// const express = require('express');
// const {
//   createCategory,
//   getAllCategories,
//   getCategoryById,
//   deleteCategoryById,
//   updateCategory,
// } = require('../controllers/categoryController');
// const { userAuth, adminOnly } = require('../middlewares/auth');

// const categoryroute = express.Router();
// categoryroute.post('admin/add', userAuth, adminOnly, createCategory);
// categoryroute.get('/', getAllCategories);
// categoryroute.get('/:id', getCategoryById);
// categoryroute.delete(
//   '/admin/delete/:id',
//   userAuth,
//   adminOnly,
//   deleteCategoryById
// );
// categoryroute.patch('/admin/update/:id', userAuth, adminOnly, updateCategory);

// module.exports = categoryroute;
//////////////////////////////////////
const express = require('express');
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteCategoryById,
  updateCategory,
  getByName,
} = require('../controllers/categoryController');
const { userAuth, adminOnly } = require('../middlewares/auth');

const categoryroute = express.Router();

/**
 * @swagger
 * /api/category/admin/add:
 *   post:
 *     summary: Create a new category (admin only)
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *     responses:
 *       201:
 *         description: Category created successfully
 *       401:
 *         description: Unauthorized
 */
categoryroute.post('/admin/add', userAuth, adminOnly, createCategory);

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: A list of all categories
 */
categoryroute.get('/', getAllCategories);

/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 64e...xyz
 *     responses:
 *       200:
 *         description: Category found
 *       404:
 *         description: Category not found
 */
categoryroute.get('/:id', getCategoryById);

/**
 * @swagger
 * /api/category/admin/delete/{id}:
 *   delete:
 *     summary: Delete a category by ID (admin only)
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 64e...xyz
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 */
categoryroute.delete(
  '/admin/delete/:id',
  userAuth,
  adminOnly,
  deleteCategoryById
);

/**
 * @swagger
 * /api/category/admin/update/{id}:
 *   patch:
 *     summary: Update a category by ID (admin only)
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Category Name
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 */
categoryroute.patch('/admin/update/:id', userAuth, adminOnly, updateCategory);
/**
 * @swagger
 * /api/category/search/{name}:
 *   get:
 *     summary: Get category by name
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Category name to fetch
 *     responses:
 *       200:
 *         description: Category found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   description: Category data
 *       404:
 *         description: Category not found
 */
categoryroute.get('/search/:name', getByName);

module.exports = categoryroute;
