const blacklistedTokens = require('../models/blacklistSchema');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next)=>{
    try {
        const token = req.header('Authorization')?.split(' ')[1];

        if(!token){
            return res.status(401).json({ message: 'Access Denied. No Token Provided.' });
        }

        const blacklistedToken = await blacklistedTokens.findOne({ token });
        if(blacklistedToken){
            return res.status(401).json({ message: 'Token is blacklisted. Please log in again' });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decode;

        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = authMiddleware;