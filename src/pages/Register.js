import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../components/api";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "employee", // Default role employee hi rahega
    adminKey: "",      // Admin verify karne ke liye extra field
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Backend ko data bhej rahe hain
      await API.post("accounts/register/", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role, // "employee" ya "admin" dropdown se jayega
        adminKey: formData.adminKey, // Ye sirf admin ke liye zaroori hoga
      });

      alert(`${formData.role === 'admin' ? 'Admin' : 'Employee'} Registration Successful!`);

      // Agar admin hai toh admin login par bhej do, warna normal login par
      if (formData.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error.response?.data?.error || "Registration Failed");
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg border-0 p-4" style={{ width: "400px", borderRadius: "15px" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">Create Account</h2>
          <p className="text-muted">Join ProLeave Management</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* --- Role Selection Dropdown --- */}
          <div className="mb-3">
            <label className="form-label small fw-bold">Register As</label>
            <select
              name="role"
              className="form-select bg-light"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="employee">Employee (Staff)</option>
              <option value="admin">Admin (HR/Manager)</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold">Full Name</label>
            <input type="text" name="fullName" className="form-control bg-light" placeholder="John Doe" onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold">Email Address</label>
            <input type="email" name="email" className="form-control bg-light" placeholder="name@company.com" onChange={handleChange} required />
          </div>

          {/* --- Admin Secret Key (Sirf tab dikhega jab role 'admin' select hoga) --- */}
          {formData.role === "admin" && (
            <div className="mb-3 border p-2 border-danger rounded">
              <label className="form-label small fw-bold text-danger">Admin Secret Key</label>
              <input
                type="password"
                name="adminKey"
                className="form-control"
                placeholder="Enter Master Key"
                onChange={handleChange}
                required
              />
              <small className="text-muted" style={{fontSize: '10px'}}>Only authorized admins can register.</small>
            </div>
          )}

          <div className="mb-3">
            <label className="form-label small fw-bold">Password</label>
            <input type="password" name="password" className="form-control bg-light" placeholder="••••••••" onChange={handleChange} required />
          </div>

          <div className="mb-4">
            <label className="form-label small fw-bold">Confirm Password</label>
            <input type="password" name="confirmPassword" className="form-control bg-light" placeholder="••••••••" onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold py-2 shadow-sm">
            Register as {formData.role === 'admin' ? 'Admin' : 'Employee'}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="small text-muted">Already have an account? <Link to="/login" className="text-primary fw-bold text-decoration-none">Login</Link></p>
        </div>
      </div>
    </div>
  );
}
export default Register;
