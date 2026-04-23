import { useEffect, useState } from 'react';
import API from '../api/axios';
import { logout } from '../utils/auth';

function Admin() {
  const [data, setData] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchAdminData = async () => {
    try {
      const res = await API.get('/admin'); // backend protected route
      setData(res.data);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="mb-5">
        <p><strong>Username:</strong> {user?.username}</p>
        <p><strong>Role:</strong> {user?.role}</p>
        <p><strong>Department:</strong> {user?.department}</p>
      </div>

      <hr className="my-4" />

      <h2 className="text-xl mb-3">Admin Data</h2>

      {data ? (
        <pre className="bg-gray-100 p-3 rounded">
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : (
        <p>Loading admin data...</p>
      )}
    </div>
  );
}

export default Admin;