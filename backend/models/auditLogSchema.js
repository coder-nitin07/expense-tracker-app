const mongoose = require('mongoose');

const auditLogSchema = mongoose.Schema({
    action: {
        type: String,
        required: true,
        enum: [ 'CREATE_EXPENSE', 'UPDATE_STATUS' ]
    },
    expenseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense',
        required: true
    },
    performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    details: {
        type: Object,
        default: {}
    }
},{ timestamps: true });

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

module.exports = AuditLog;