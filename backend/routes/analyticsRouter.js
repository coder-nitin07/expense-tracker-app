const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { getTotalExpenseByCategory, getExpenseByMonth } = require('../controllers/analyticsController');
const analyticsRouter = express.Router();

analyticsRouter.get('/total-expense-by-category', authMiddleware, roleMiddleware, getTotalExpenseByCategory);
analyticsRouter.get('/get-expense-by-month', authMiddleware, roleMiddleware, getExpenseByMonth);

module.exports = { analyticsRouter };