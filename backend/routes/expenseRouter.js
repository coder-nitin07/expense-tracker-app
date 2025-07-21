const express = require('express');
const { createExpense, getAllExpenseOfEmployee, getExpenseById, updateExpense, deleteExpense } = require('../controllers/expenseController');
const { validateExpense } = require('../middleware/validateExpense');
const authMiddleware = require('../middleware/authMiddleware');
const checkAdminOrOwnerOfExpense = require('../middleware/roleMiddleware');
const expenseRouter = express.Router();

expenseRouter.post('/createExpese', authMiddleware, validateExpense, createExpense);
expenseRouter.get('/getExpenseOfEmployee', authMiddleware, getAllExpenseOfEmployee);
expenseRouter.get('/getExpenseById/:id', authMiddleware, checkAdminOrOwnerOfExpense, getExpenseById);
expenseRouter.put('/updateExpense/:id', authMiddleware, checkAdminOrOwnerOfExpense, validateExpense, updateExpense);
expenseRouter.delete('/deleteExpense/:id', authMiddleware, checkAdminOrOwnerOfExpense, deleteExpense);

module.exports = { expenseRouter };