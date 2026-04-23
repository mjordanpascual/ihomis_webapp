import { useEffect, useState } from 'react';
import API from '../api/axios'; // axios instance with token

function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user'));

    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
        const res = await API.get('/dashboard'); // protected route
        setData(res.data);
        } catch (err) {
        console.log(err.response?.data);

        // ❌ If token invalid/expired → logout
        if (err.response?.status === 401) {
            localStorage.clear();
            window.location.href = '/';
        }
        }
    };

    // ✅ Call API when page loads
    useEffect(() => {
        fetchData();
    }, []);


  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {user.username}</p>
      <p>Department: {user.department}</p>
    </div>
  );
}

export default Dashboard;


// import { useEffect, useState } from 'react';
// import API from '../api/axios'; // axios instance with token

// function Dashboard() {
//   const [data, setData] = useState(null);

//   const fetchData = async () => {
//     try {
//       const res = await API.get('/dashboard'); // protected route
//       setData(res.data);
//     } catch (err) {
//       console.log(err.response?.data);

//       // ❌ If token invalid/expired → logout
//       if (err.response?.status === 401) {
//         localStorage.clear();
//         window.location.href = '/';
//       }
//     }
//   };

//   // ✅ Call API when page loads
//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Dashboard</h1>

//       {data ? (
//         <pre>{JSON.stringify(data, null, 2)}</pre>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// export default Dashboard;