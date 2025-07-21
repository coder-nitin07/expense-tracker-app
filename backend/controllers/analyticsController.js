const Expense = require("../models/expenseSchema");

// Get Total Expense By Category
const getTotalExpenseByCategory = async (req, res)=>{
    try {
        const data = await Expense.aggregate([
            {
                $group: {
                    _id: '$category',
                    totalAmount: { $sum: '$amount' }
                }
            }
        ]);

        const result = {};
        data.forEach(item=> {
            result[item._id] = item.totalAmount;
        });

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get Expenses By Month
const getExpenseByMonth = async (req, res)=>{
    try {
        const data = await Expense.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    totalAmount: { $sum: '$amount' }
                }
            },
            {
                 $sort: { _id: 1 }
            }
        ]);

        const result = {};
        data.forEach(item =>{
            const [ year, month ] = item._id.split('-');
            const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long' });
            const label = `${monthName} ${year}`;
            result[ label ] = item.totalAmount;
        });

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { getTotalExpenseByCategory, getExpenseByMonth };