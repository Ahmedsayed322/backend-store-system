// // routes/productRoutes.js
// const express = require('express');
// const multipleUpload = require('../middlewares/uploads');
// const { userAuth, adminOnly } = require('../middlewares/auth');
// const {
//   addProduct,
//   getProduct,
//   editProduct,
// } = require('../controllers/productController');

// const productRouter = express.Router();

// productRouter.post('/add', userAuth, adminOnly, multipleUpload, addProduct);
// productRouter.patch(
//   '/edit/:id',
//   userAuth,
//   adminOnly,
//   multipleUpload,
//   editProduct
// );
// productRouter.get('/:id', getProduct);
// module.exports = productRouter;
/////////////////////////////////////////////////////////
const express = require('express');
const multipleUpload = require('../middlewares/uploads');
const { userAuth, adminOnly } = require('../middlewares/auth');
const {
  addProduct,
  getProduct,
  editProduct,
  getAllProducts,
  deleteProduct,
} = require('../controllers/productController');

const productRouter = express.Router();

/**
 * @swagger
 * /api/products/add:
 *   post:
 *     summary: Add a new product (admin only)
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               quantity:
 *                 type: number
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               colors:
 *                 type: string
 *                 example: "red-blue-black"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               coverImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product added successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
productRouter.post('/add', userAuth, adminOnly, multipleUpload, addProduct);

/**
 * @swagger
 * /api/products/edit/{id}:
 *   patch:
 *     summary: Edit an existing product (admin only)
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               colors:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["red", "blue", "black"]
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
productRouter.patch(
  '/edit/:id',
  userAuth,
  adminOnly,
  multipleUpload,
  editProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 */
productRouter.get('/:id', getProduct);
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products with pagination, search, and filters
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by product name
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price
 *     responses:
 *       200:
 *         description: List of products
 */
productRouter.get('/', getAllProducts);
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID (admin only)
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
productRouter.delete('/:id', userAuth, adminOnly, deleteProduct);
module.exports = productRouter;
