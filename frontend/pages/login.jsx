import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from './utils/authcontext';

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Email validation
    if (!/^\S+@\S+\.\S+$/.test(Email)) {
      setError('Invalid Email address');
      return;
    }

    // Basic Password validation
    if (Password.length < 4) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post('http://localhost:3000/administrator/', { Email, Password }, { withCredentials: true });

      console.log('responsed:', response);
      console.log('Login successful!', response.data);
      login(Email, response.data.cookie);
      router.push('/');
    } catch (error) {
      // Handle login failure (display error message, etc.)
      console.error('Login failed:', error.response.data.message);
      setError('Invalid Email or Password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            name="Email"
            value={Email}
            onChange={handleChangeEmail}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            name="Password"
            value={Password}
            onChange={handleChangePassword}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Password"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Log In'}
          </button>
          <button
            type="button"
            className="text-blue-500 hover:underline focus:outline-none"
            onClick={() => router.push('/forgetpass')}
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;