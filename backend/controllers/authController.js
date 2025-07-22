const User = require("../models/authSchema");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const blacklistedTokens = require("../models/blacklistSchema");

// Create the user
const createUser = async (req, res)=>{
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(409).json({ message: 'Email already registered' });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const isFirstUser = (await User.countDocuments()) === 0;
        const role = isFirstUser ? 'Admin' : 'Employee';

        const newUser = new User({ 
            name, 
            email, 
            password: hashPassword, 
            role 
        });

        await newUser.save();
        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(201).json({ message: 'User Created Successfully', user: {
            name,
            email,
            role
        }, token  })
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
};

// login the User
const loginUser = async (req, res)=>{
    try {
        const { email, password } = req.body;
        const secretKey = process.env.SECRET_KEY;

        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: 'Invalid Credentials' })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const payload = { id: user._id, username: user.name, role: user.role };

        const jwtToken = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        res.status(200).json({ message: 'User login successfully',  token: jwtToken,  user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            } });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// logout the User  
const logoutUser = async (req, res)=>{
    try {
        const token = req.header('Authorization')?.split(' ')[1];

        if(!token){
            return res.status(400).json({ message: 'No Token Provided' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if(!decoded){
            return res.status(400).json({ message: 'Invalid Token' });
        }

        const expiresAt = new Date(decoded.exp * 1000); // Change the time into milisecods

        await blacklistedTokens.create({ token, expiresAt });

        res.status(200).json({ message: 'User Logged Out successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { createUser, loginUser, logoutUser };