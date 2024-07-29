import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setError(null);
      setLoading(false);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-5 p-6 bg-white shadow-lg rounded-lg border border-gray-300">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          required
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          required
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
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
