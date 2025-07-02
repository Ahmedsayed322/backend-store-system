const express = require('express');
const {
  addReview,
  deleteReview,
  getReviews,
  editReview,
} = require('../controllers/reviewControllers');
const { userAuth } = require('../middlewares/auth');
const reviewRouter = express.Router();
reviewRouter.post('/add/:productid', userAuth, addReview); //addcomment takes productId
reviewRouter.delete('/delete/:reviewid', userAuth, deleteReview); //removeComment takes commentId
reviewRouter.get('/:productid', getReviews);
reviewRouter.patch('/edit/:reviewid', userAuth, editReview);
module.exports = {
  reviewRouter,
};
