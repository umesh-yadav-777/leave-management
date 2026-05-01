import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Account Created:", formData);
    alert("Registration Successful! Please Login.");
    navigate("/login");
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg border-0 p-4" style={{ width: "400px", borderRadius: "15px" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">Create Account</h2>
          <p className="text-muted">Join ProLeave Management</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-bold">Full Name</label>
            <input type="text" name="fullName" className="form-control bg-light" placeholder="John Doe" onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold">Email Address</label>
            <input type="email" name="email" className="form-control bg-light" placeholder="name@company.com" onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold">Password</label>
            <input type="password" name="password" className="form-control bg-light" placeholder="••••••••" onChange={handleChange} required />
          </div>

          <div className="mb-4">
            <label className="form-label small fw-bold">Confirm Password</label>
            <input type="password" name="confirmPassword" className="form-control bg-light" placeholder="••••••••" onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold py-2 shadow-sm">
            Register
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="small text-muted">
            Already have an account? <Link to="/login" className="text-primary fw-bold text-decoration-none">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
