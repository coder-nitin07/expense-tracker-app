import { useAuth } from '../context/AuthContext';
import EmployeeDashboard from './dashboard/EmployeeDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, { user?.name }</h1>

      { user?.role === 'admin' ? (
        <AdminDashboard />
      ) : (
        <EmployeeDashboard />
      )}
    </div>
  );
};

export default Dashboard;
