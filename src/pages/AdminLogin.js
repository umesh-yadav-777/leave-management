import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../components/api"; // Path check kar lena

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Backend ko 'username' key mein email bhejna hai
      const response = await API.post("accounts/login/", {
        username: email,
        password: password
      });

      // Role check
      if (response.data.role === "admin") {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("userRole", "admin");
        alert("Admin Login Successful!");
        navigate("/admin-dashboard"); // Dashboard ka sahi path yahan likhein
      } else {
        alert("Aap Admin nahi hain! Normal login use karein.");
      }
    } catch (error) {
      console.error(error);
      alert("Invalid Admin Credentials - Check email/password");
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center text-danger mb-4"> Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-bold">Admin Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" required />
          </div>
          <div className="mb-4">
            <label className="form-label fw-bold">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required />
          </div>
          <button type="submit" className="btn btn-danger w-100">Secure Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
