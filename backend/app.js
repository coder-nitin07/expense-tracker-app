const express = require('express');
const db = require('./config/db');
const { authRouter } = require('./routes/authRoutes');
const { expenseRouter } = require('./routes/expenseRouter');
const { analyticsRouter } = require('./routes/analyticsRouter');
const { auditRouter } = require('./routes/auditRoutes');
const cors = require('cors');
const app = express();
require('dotenv').config();

// parse middleware
app.use(express.json());

// DB Connection
db();

app.use(cors());

// routes
app.use('/auth', authRouter);
app.use('/expense', expenseRouter);
app.use('/analytics', analyticsRouter);
app.use('/audit', auditRouter);

app.get('/', (req, res)=>{
    res.send('Expense Tracker App Project');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
});