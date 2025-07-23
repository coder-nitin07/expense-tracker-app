const express = require('express');
const { createUser, createUserByAdmin, loginUser, logoutUser  } = require('../controllers/authController');
const { validateUser } = require('../middleware/validateUser');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const authRouter = express.Router();

authRouter.post('/createUser', validateUser, createUser);
authRouter.post('/admin/create-user', authMiddleware, roleMiddleware, createUserByAdmin);
authRouter.post('/loginUser', loginUser);
authRouter.post('/logoutUser', authMiddleware, logoutUser);

module.exports = { authRouter };