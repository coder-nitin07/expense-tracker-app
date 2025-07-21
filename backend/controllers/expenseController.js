const User = require("../models/authSchema");
const Expense = require("../models/expenseSchema");

// Create Expense API
const createExpense = async (req, res)=>{
    try {
        const { title, amount, category, description } = req.body;

        if(!title || !amount || !category){
            return res.status(404).json({ message: 'Please filled all the fields' });
        }

        const newExpense = await Expense.create({
            createdBy: req.user.id,
            title,
            amount,
            category,
            description
        });

        res.status(201).json({ message: 'Expense Created Successfully', newExpense });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get Expenses API
const getAllExpenseOfEmployee = async (req, res)=>{
    try {
        const { id, role } = req.user;
        
        const getUser = await User.findById(id);
        if(!getUser){
            return res.status(404).json({ message: 'Employee not found.' });
        }

        const getExpenses = role === 'Admin'
            ? await Expense.find().populate('createdBy', 'name email')
            : await Expense.find({ createdBy: id })

        res.status(200).json({ message: 'Get All Expenses of a Employee', getExpenses });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get Expense By Id API
const getExpenseById = async (req, res)=>{
    try {
        const { id, role } = req.params;

        const getExpense = await Expense.findById(id);
        if(!getExpense){
            return res.status(404).json({ message: 'Expense Data not found' });
        }

        const getExpenses = role === 'Admin'
            ? await Expense.find().populate('createdBy', 'name email')
            : await Expense.find({ createdBy: id })

        res.status(200).json({ message: 'Get Expense Successfully', getExpense });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }  
};

// Update Expense
const updateExpenseStatus = async (req, res)=>{
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['Pending', 'Approved', 'Rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: `Invalid status. Status must be one of: ${validStatuses.join(', ')}` });
        }

        const getExpense = await Expense.findById(id);
        if(!getExpense){
            return res.status(404).json({ message: 'Expense Data not found' });
        }


        getExpense.status = status;

        const updatedExpense = await getExpense.save();
        res.status(200).json({ message: 'Expense Updated Successfully', updatedExpense });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Delete Expense
const deleteExpense = async (req, res)=>{
    try {
        const { id } = req.params;
        const expenseId = await Expense.findById(id);

        if(!expenseId){
            return res.status(404).json({ message: 'Expense not found' });
        }

        const deletedExpense = await Expense.findByIdAndDelete(id);
        res.status(200).json({ message: 'Expense Deleted Succesfully', deletedExpense });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { createExpense, getAllExpenseOfEmployee, getExpenseById, updateExpenseStatus, deleteExpense };