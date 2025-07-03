// const express = require('express');
// const {
//   signup,
//   login,
//   profile,
//   edit,
//   logout,
//   logoutAll,
// } = require('../controllers/userController');
// const { userAuth } = require('../middlewares/auth');
// const userRouter = express.Router();
// userRouter.post('/signup', signup);
// userRouter.post('/login', login);
// userRouter.get('/profile', userAuth, profile);
// userRouter.patch('/profile/edit', userAuth, edit);
// userRouter.post('/logout', userAuth, logout);
// userRouter.post('/logoutall', userAuth, logoutAll);

// module.exports = userRouter;
////////////////////////////////////////
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

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ahmed
 *               email:
 *                 type: string
 *                 example: ahmed@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
userRouter.post('/signup', signup);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - emailorusername
 *               - password
 *             properties:
 *               emailorusername:
 *                 type: string
 *                 example: ahmed@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful, returns token
 *       401:
 *         description: Invalid credentials
 */
userRouter.post('/login', login);

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get logged in user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile data
 *       401:
 *         description: Unauthorized
 */
userRouter.get('/profile', userAuth, profile);

/**
 * @swagger
 * /api/user/profile/edit:
 *   patch:
 *     summary: Edit profile for logged in user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 */
userRouter.patch('/profile/edit', userAuth, edit);

/**
 * @swagger
 * /api/user/logout:
 *   post:
 *     summary: Logout from current session
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       401:
 *         description: Unauthorized
 */
userRouter.post('/logout', userAuth, logout);

/**
 * @swagger
 * /api/user/logoutall:
 *   post:
 *     summary: Logout from all devices
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out from all sessions
 *       401:
 *         description: Unauthorized
 */
userRouter.post('/logoutall', userAuth, logoutAll);

module.exports = userRouter;
