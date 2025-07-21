const express = require('express');
const { createExpense, getAllExpenseOfEmployee, getExpenseById } = require('../controllers/expenseController');
const { validateExpense } = require('../middleware/validateExpense');
const authMiddleware = require('../middleware/authMiddleware');
const checkAdminOrOwnerOfExpense = require('../middleware/roleMiddleware');
const expenseRouter = express.Router();

expenseRouter.post('/createExpese', authMiddleware, validateExpense, createExpense);
expenseRouter.get('/getExpenseOfEmployee', authMiddleware, getAllExpenseOfEmployee);
expenseRouter.get('/getExpenseById/:id', authMiddleware, checkAdminOrOwnerOfExpense, getExpenseById);

module.exports = { expenseRouter };