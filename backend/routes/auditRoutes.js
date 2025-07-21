const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { getAuditLogs } = require('../controllers/auditController');
const auditRouter = express.Router();

auditRouter.get('/getAuditLogs', authMiddleware, roleMiddleware, getAuditLogs);

module.exports = { auditRouter };