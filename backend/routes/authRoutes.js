const express = require('express');
const { createUser, loginUser, logoutUser } = require('../controllers/authController');
const { validateUser } = require('../middleware/validateUser');
const authMiddleware = require('../middleware/authMiddleware');
const authRouter = express.Router();

authRouter.post('/createUser', validateUser, createUser);
authRouter.post('/loginUser', loginUser);
authRouter.post('/logoutUser', authMiddleware, logoutUser);

module.exports = { authRouter };