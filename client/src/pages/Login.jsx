import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import {toast} from "react-hot-toast";
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Step 1: Login request
      const res = await axios.post(
        "https://appointment-booking-backend-mw2h.onrender.com/api/auth/login",
        formData
      );
      const token = res.data.token;

      // Step 2: Save token
      localStorage.setItem("token", token);

      // Step 3: Fetch user info
      const userRes = await axios.get(
        "http://localhost:5000/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const user = userRes.data;

      // Optional: Save user info
      localStorage.setItem("user", JSON.stringify(user));

      // Step 4: Redirect based on role
      if (user.role === "admin") {
        toast.success("Admin login successful!")
        // alert("Admin login successful!");
        navigate("/admin");
      } else {
        // alert("Login successful!");
         toast.success("Logged In successful!")
        navigate("/");
      }
    } catch (err) {
       toast.error(err.message);
      setError(err.response?.data?.message || "Login failed");
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

        <button className="btn btn-primary w-100">Login</button>
      </form>

      <div className="text-center mt-3">
        New user? <Link to="/register">Register here</Link>
      </div>
    </div>
  );
};

export default Login;
