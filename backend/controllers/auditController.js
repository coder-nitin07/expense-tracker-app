const AuditLog = require("../models/auditLogSchema");

// Get Audit Logs
const getAuditLogs = async (req, res)=>{
    try {
        const logs = await AuditLog.find()
                            .populate('performedBy', 'name email')
                            .populate('expenseId', 'title amount')
                            .sort({ createdAt: -1 });

        res.status(200).json({ message: 'Audit Logs Fetched Successfully', logs });
    } catch (err) { 
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { getAuditLogs };