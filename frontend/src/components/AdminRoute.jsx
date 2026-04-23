import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));

   // ❌ If no user OR not admin → redirect
  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  // ✅ If admin → allow access
  return children;
}

export default AdminRoute;