import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      nav('/');
    } catch (err) {
      alert('Login failed!');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        <input className="w-full mb-4 p-2 rounded bg-gray-700 text-white" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="w-full mb-4 p-2 rounded bg-gray-700 text-white" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="w-full bg-blue-600 hover:bg-blue-500 p-2 rounded">Login</button>
        <p className="text-sm mt-4 text-center text-gray-400">Don’t have an account? <a className="text-blue-400" href="/register">Register</a></p>
      </form>
    </div>
  );
};

export default Login;
