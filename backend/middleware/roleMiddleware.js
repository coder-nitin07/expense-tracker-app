
// Admin only 
const roleMiddleware = async (req, res, next)=>{
    try {
        const userRole = req.user.role;

        // Admin verification
        if(userRole === 'Admin'){
            return next();
        };

        
        return res.status(403).json({ message: 'Access denied: You are not authorized to modify this expense' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = roleMiddleware;