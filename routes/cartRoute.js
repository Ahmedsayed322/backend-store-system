const express = require('express');
const { userAuth } = require('../middlewares/auth');
const {
  addToCart,
  removeProductFromCart,
  clearCart,
  getCart,
} = require('../controllers/cartController');
const cartRouter = express.Router();

/**
 * @swagger
 * /api/cart/add/{id}:
 *   post:
 *     summary: Add product to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               color:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product added to cart
 */
cartRouter.post('/add/:id', userAuth, addToCart);

/**
 * @swagger
 * /api/cart/remove/{id}:
 *   delete:
 *     summary: Remove a product with specific color from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - color
 *             properties:
 *               color:
 *                 type: string
 *                 description: Color of the product to remove
 *     responses:
 *       200:
 *         description: Product removed from cart
 */
cartRouter.delete('/remove/:id', userAuth, removeProductFromCart);

/**
 * @swagger
 * /api/cart/clear:
 *   delete:
 *     summary: Clear all products from the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared
 */
cartRouter.delete('/clear', userAuth, clearCart);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get all info from the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: cart items
 */

cartRouter.get('/', userAuth, getCart);

module.exports = {
  cartRouter,
};
