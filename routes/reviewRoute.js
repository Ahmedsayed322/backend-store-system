// const express = require('express');
// const {
//   addReview,
//   deleteReview,
//   getReviews,
//   editReview,
// } = require('../controllers/reviewControllers');
// const { userAuth } = require('../middlewares/auth');
// const reviewRouter = express.Router();
// reviewRouter.post('/add/:productid', userAuth, addReview); //addcomment takes productId
// reviewRouter.delete('/delete/:reviewid', userAuth, deleteReview); //removeComment takes commentId
// reviewRouter.get('/:productid', getReviews);
// reviewRouter.patch('/edit/:reviewid', userAuth, editReview);
// module.exports = {
//   reviewRouter,
// };
//////////////////////////////////////////////////////////////////////////////
const express = require('express');
const {
  addReview,
  deleteReview,
  getReviews,
  editReview,
} = require('../controllers/reviewControllers');
const { userAuth } = require('../middlewares/auth');

const reviewRouter = express.Router();

/**
 * @swagger
 * /api/review/add/{productid}:
 *   post:
 *     summary: Add a review for a product
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productid
 *         required: true
 *         schema:
 *           type: string
 *           example: 64e...xyz
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 example: 4
 *               comment:
 *                 type: string
 *                 example: "Great product!"
 *     responses:
 *       201:
 *         description: Review added successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
reviewRouter.post('/add/:productid', userAuth, addReview);

/**
 * @swagger
 * /api/review/delete/{reviewid}:
 *   delete:
 *     summary: Delete a review by ID
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Review not found
 */
reviewRouter.delete('/delete/:reviewid', userAuth, deleteReview);

/**
 * @swagger
 * /api/review/{productid}:
 *   get:
 *     summary: Get all reviews for a product
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: productid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of reviews
 *       404:
 *         description: Product not found or no reviews
 */
reviewRouter.get('/:productid', getReviews);

/**
 * @swagger
 * /api/review/edit/{reviewid}:
 *   patch:
 *     summary: Edit a review by ID
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: "Updated comment"
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Review not found
 */
reviewRouter.patch('/edit/:reviewid', userAuth, editReview);

module.exports = {
  reviewRouter,
};
