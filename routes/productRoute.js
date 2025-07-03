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
} = require('../controllers/productController');

const productRouter = express.Router();

/**
 * @swagger
 * /api/product/add:
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
 * /api/product/edit/{id}:
 *   patch:
 *     summary: Edit an existing product (admin only)
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
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
 * /api/product/{id}:
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

module.exports = productRouter;
