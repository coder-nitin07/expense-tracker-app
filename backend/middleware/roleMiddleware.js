const Expense = require("../models/expenseSchema");

// Check Admin or Owner of Expense
const checkAdminOrOwnerOfExpense = async (req, res, next)=>{
    try {
        const expenseId = req.params.id;
        const userId = req.user.id;

        // Admin verification
        if(req.user.role === 'Admin'){
            return next();
        };

        const expense = await Expense.findById(expenseId);

        if(!expense){
            return res.status(404).json({ message: 'Expense not found' });
        }

        if(expense.createdBy.toString() !== userId){
            return res.status(403).json({ message: 'Access denied: not your expense' });
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = checkAdminOrOwnerOfExpense;