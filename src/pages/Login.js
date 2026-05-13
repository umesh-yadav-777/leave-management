import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../components/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("accounts/login/", {
        username: email,
        password: password
      });

      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("userRole", response.data.role);

      alert("Login Successful!");

      if (response.data.role === "employee") {
        navigate("/dashboard");
      } else {
        navigate("/admin-dashboard");
      }
    } catch (error) {
      alert("Login Failed: " + (error.response?.data?.detail || "Check credentials"));
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-dark">
       <div className="card p-4 bg-secondary text-white" style={{ width: "400px" }}>
          <h2 className="text-center mb-4">User Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" required />
            </div>
            <div className="mb-4">
              <label className="form-label">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required />
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign In</button>
          </form>
       </div>
    </div>
  );
}

export default Login;
