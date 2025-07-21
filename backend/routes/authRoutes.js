const express = require('express');
const { createUser, loginUser } = require('../controllers/authController');
const { validateUser } = require('../middleware/validateUser');
const authRouter = express.Router();

authRouter.post('/createUser', validateUser, createUser);
authRouter.post('/loginUser', loginUser);

module.exports = { authRouter };