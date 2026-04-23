import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // const res = await API.post('/login', form);
      const res = await API.post('/login', form); // matches /api/login

      // ✅ Save token
      localStorage.setItem('token', res.data.token);

      // ✅ Save user info
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // ✅ Redirect based on role
      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }

    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="p-5 border rounded w-80">
        <h2 className="text-xl mb-3">Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full mb-2 p-2 border"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-2 p-2 border"
        />

        <button className="w-full bg-blue-500 text-white p-2">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;