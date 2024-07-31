import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInFailure, signInSuccess } from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      alert("User signed in successfully");
      navigate("/profile/alice_j");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-5 p-6 bg-white shadow-lg rounded-lg border border-gray-300">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className="flex justify-center gap-2 mt-6">
        <p className="text-gray-600">Don't have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-600 font-semibold hover:underline">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
}
