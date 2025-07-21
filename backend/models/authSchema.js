const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [ 'Employee', 'Admin' ],
        default: 'Employee'
    }
},{ timestamps: true });

const User = mongoose.model('User', authSchema);

module.exports = User;