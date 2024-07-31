import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (res.status !== 201) {
        setError(data.message);
        setLoading(false);
        return;
      }

      alert('User signed up successfully');
      setLoading(false);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-5 p-6 bg-white shadow-lg rounded-lg border border-gray-300">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
          <input
            type="text"
            placeholder="First Name"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex-1"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex-1"
            required
          />
        </div>
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          required
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          required
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-3 rounded-md uppercase font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400"
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth />
      </form>
      <div className="flex justify-center gap-2 mt-6">
        <p className="text-gray-600">Already have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-600 font-semibold hover:underline">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
}
