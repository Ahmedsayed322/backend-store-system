const express = require('express');
const { userAuth } = require('../middlewares/auth');
const {
  addToCart,
  removeProductFromCart,
  clearCart,
  getCart,
  editCartItem,
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
/**
 * @swagger
 * /api/cart/edit/{id}:
 *   patch:
 *     summary: Edit a product in the cart (change quantity)
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *               - quantity
 *             properties:
 *               color:
 *                 type: string
 *                 example: "red"
 *               quantity:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Invalid input (e.g. color not available or quantity exceeds stock)
 *       404:
 *         description: Product or cart not found
 */
cartRouter.patch('/edit/:id', userAuth, editCartItem);

module.exports = {
  cartRouter,
};
