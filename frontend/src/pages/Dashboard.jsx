import { useAuth } from '../context/AuthContext';
import AdminDashboard from './dashboard/AdminDashboard';
import EmployeeDashboard from './dashboard/EmployeeDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, { user?.name }</h1>
      { console.log("first", user.role) }
      { user?.role === 'Admin' ? (
        <AdminDashboard />
      ) : (
        <EmployeeDashboard />
      )}
    </div>
  );
};

export default Dashboard;
