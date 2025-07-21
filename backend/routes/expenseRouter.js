const express = require('express');
const { createExpense, getAllExpenseOfEmployee, getExpenseById, updateExpenseStatus, deleteExpense } = require('../controllers/expenseController');
const { validateExpense } = require('../middleware/validateExpense');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const expenseRouter = express.Router();

expenseRouter.post('/createExpese', authMiddleware, validateExpense, createExpense);
expenseRouter.get('/getExpenseOfEmployee', authMiddleware, getAllExpenseOfEmployee);
expenseRouter.get('/getExpenseById/:id', authMiddleware, getExpenseById);
expenseRouter.put('/updateExpense/:id/status', authMiddleware, roleMiddleware, updateExpenseStatus);
expenseRouter.delete('/deleteExpense/:id', authMiddleware, roleMiddleware, deleteExpense);

module.exports = { expenseRouter };