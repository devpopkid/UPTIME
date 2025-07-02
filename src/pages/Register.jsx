import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', { email, password });
      alert('Account created!');
      nav('/login');
    } catch (err) {
      alert('Error: Email may already be taken.');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <form onSubmit={handleRegister} className="bg-gray-800 p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
        <input className="w-full mb-4 p-2 rounded bg-gray-700 text-white" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="w-full mb-4 p-2 rounded bg-gray-700 text-white" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="w-full bg-green-600 hover:bg-green-500 p-2 rounded">Register</button>
        <p className="text-sm mt-4 text-center text-gray-400">Already have an account? <a className="text-blue-400" href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default Register;
