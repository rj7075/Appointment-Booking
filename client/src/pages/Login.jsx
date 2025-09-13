import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { toast } from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // ✅ Step 1: Send login request
      const res = await axios.post(
        "https://appointment-booking-server1.onrender.com/api/auth/login",
        formData
      );

      const { token, user } = res.data;

      // ✅ Step 2: Save token & user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Step 3: Redirect based on role
      if (user.role === "admin") {
        toast.success("Admin login successful!");
        navigate("/admin");
      } else {
        toast.success("Logged in successfully!");
        navigate("/");
      }
    } catch (err) {
      console.error("Login frontend error:", err); // 👈 log error in console
      const msg = err.response?.data?.message || "Login failed";
      toast.error(msg);
      setError(msg);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Login</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>

      <div className="text-center mt-3">
        New user? <Link to="/register">Register here</Link>
      </div>
    </div>
  );
};

export default Login;
