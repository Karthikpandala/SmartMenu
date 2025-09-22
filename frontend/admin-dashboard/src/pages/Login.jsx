import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../services/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await auth.login(email, password);
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      navigate(user.role === 'owner' ? '/admin/dashboard' : '/admin/orders');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-bold">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded"/>
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded"/>
        <button type="submit" className="w-full bg-gray-800 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
