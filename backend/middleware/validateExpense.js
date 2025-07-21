const Joi = require('joi');

const expenseSchema = Joi.object({
    title: Joi.string().trim().min(3).max(20).required().messages({
        'string.min': 'Title must be required and not max than 20 and least than 3 characters '
    }),

    amount: Joi.number().min(100).max(10000).required().messages({
        'number.min': 'Expense Amount must be between 100 to 10000 rupees'
    }),

    category: Joi.string().valid('Food', 'Transport', 'Shopping', 'Utilities', 'Other').default('Other').messages({
        'any.only': 'Category should be only that provide in options.'
    }),

    description: Joi.string().min(10).max(100).required().messages({
        'string.min': 'Desciption should be in 10 to 100 words limit. '
    })
});

const validateExpense = (req, res, next)=>{
    const { error } = expenseSchema.validate(req.body);

    if(error){
        const errorMessages = error.details.map(err => err.message).join(',');
        return res.status(400).json({  message: errorMessages });
    }

    next();
};

module.exports = { validateExpense };