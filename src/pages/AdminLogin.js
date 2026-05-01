import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Yahan aap apni logic check kar sakte hain
    if (email === "umesh@company.com" && password === "admin123") {
      alert("Admin Login Successful!");
      localStorage.setItem("userRole", "admin");
      navigate("/admin-dashboard"); // Login ke baad dashboard par bhejein
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div style={{
      height: "100vh", display: "flex", justifyContent: "center",
      alignItems: "center", backgroundColor: "#f8f9fa"
    }}>
      <div style={{
        background: "white", padding: "40px", borderRadius: "20px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)", width: "100%", maxWidth: "400px"
      }}>
        <h2 style={{ textAlign: "center", fontWeight: "bold", marginBottom: "30px", color: "#dc3545" }}>
          🛡️ Admin Login
        </h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Admin Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: "30px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-danger w-100 py-2 fw-bold rounded-pill">
            Secure Login
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "20px", color: "#718096", fontSize: "14px" }}>
          Authorized access only. All activities are logged.
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
