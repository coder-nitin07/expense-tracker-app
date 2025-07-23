# Expense Tracker App

## Overview:
The Expense Tracker App is a full-stack web application designed for companies to manage employee expense claims. It provides a secure login system, role-based access control, and a comprehensive admin panel for approving/rejecting expenses, auditing logs, and viewing analytical charts.

Employees can log in to submit and track their own expenses, while admins have visibility into all records and insights.


## Features

### Authentication & Role-Based Access Control (RBAC)
- JWT-based secure login
- Role assignment: Admin or Employee
- Only Admins can access sensitive data and controls

### Expense Management
- Employees can add new expenses with title, amount, category, description
- Admins can:
  - View all expenses
  - Filter by category, status, date
  - Approve or reject pending expenses

### Admin Features
- View full expense list with pagination (10 per page)
- Download expense data as CSV
- View audit logs (actions performed like status updates)
- Generate insights via:
  - Bar chart: Total expense by category
  - Bar chart: Monthly expenses

### User Management
- Admin can create new users (Employee or Admin)

---

## Tech Stack

| Layer       | Technology           |
|------------|----------------------|
| Frontend   | React.js             |
| Backend    | Node.js, Express.js  |
| Database   | MongoDB (Mongoose)   |
| Auth       | JWT                  |
| Styling    | Tailwind CSS         |
| Charts     | Recharts             |
| Utilities  | CORS, dotenv, bcrypt |

## Folder Structure
/server
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
└── index.js

/client
├── src/
│ ├── components/
│ ├── pages/
│ ├── context/
│ ├── api/
│ └── App.js


## API Endpoints Summary

| Method | Route                         | Description              | Access         |
|--------|-------------------------------|--------------------------|----------------|
| POST   | /auth/register                | Register user            | Public         |
| POST   | /auth/login                   | Login user               | Public         |
| POST   | /auth/createUserByAdmin       | Admin creates a user     | Admin Only     |
| POST   | /expenses                     | Add expense              | Employee       |
| GET    | /expenses                     | Get expenses             | Employee/Admin |
| PUT    | /expenses/:id/status          | Change status            | Admin          |
| GET    | /analytics/total-expense-by-category | Get category data | Admin          |
| GET    | /analytics/get-expense-by-month     | Get monthly data  | Admin          |
| GET    | /audit-logs                   | View audit logs          | Admin          |

---

## Admin Test Credentials

To test the Admin features, use the following credentials in the deployed app:

```json
{
  "email": "sam@gmail.com",
  "password": "sam@1234"
}


backend deploy  URL - https://expense-tracker-backend-ujyr.onrender.com
