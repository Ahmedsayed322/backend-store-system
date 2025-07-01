const express = require('express');
const {
  signup,
  login,
  profile,
  edit,
  logout,
  logoutAll,
} = require('../controllers/userController');
const { userAuth } = require('../middlewares/auth');
const userRouter = express.Router();
userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/profile', userAuth, profile);
userRouter.patch('/profile/edit', userAuth, edit);
userRouter.post('/logout', userAuth, logout);
userRouter.post('/logoutall', userAuth, logoutAll);

module.exports = userRouter;
