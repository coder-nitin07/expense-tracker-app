const mongoose = require('mongoose');

const db = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.log('Error while connecting to the mongoDB', err);
        process.exit(1);
    }
};

module.exports = db;