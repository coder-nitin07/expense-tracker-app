const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().trim().min(3).max(20).required().messages({
        'string.min': 'Name must be required and not max than 20 and least than 3 characters '
    }),

    email: Joi.string().trim().email().required().messages({
        'string.min': 'Please use valid email format e.g. - abc@gmail.com'
    }),

    password: Joi.string().min(6).max(20).required().pattern(new RegExp('^[a-zA-Z0-9@#$%^&+=!*]+$')).messages({
        'string.min': 'Password must be strong not more than 20 and less than 6 characters.'
    })
});

const validateUser = (req, res, next)=>{
    const { error } = userSchema.validate(req.body, { abortEarly: false });

    if(error){
        const errorMessages = error.details.map(err => err.message).join(',');
        return res.status(400).json({  message: errorMessages });
    }

    next();
};

module.exports = { validateUser };