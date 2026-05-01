import React from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Form reload hone se rokne ke liye
    localStorage.setItem("userRole", "user");
    localStorage.setItem("user", "loggedin");
    navigate("/dashboard");
  };

  return (
    <div className="home-wrapper d-flex align-items-center justify-content-center">
      {/* Wahi glowing shapes jo Home page par hain */}
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>

      <div className="home-card p-5 shadow-lg" style={{ width: "100%", maxWidth: "420px" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-white mb-2">Welcome Back</h2>
          <p className="text-light opacity-50 small">Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label text-light small fw-bold">Email Address</label>
            <input
              type="email"
              className="form-control bg-dark border-secondary text-white border-opacity-25 py-2"
              placeholder="name@company.com"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-light small fw-bold">Password</label>
            <input
              type="password"
              className="form-control bg-dark border-secondary text-white border-opacity-25 py-2"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold py-2 shadow-glow rounded-pill mb-3">
            Sign In
          </button>
        </form>

        <div className="text-center mt-4 pt-3 border-top border-secondary border-opacity-25">
          <p className="small text-light opacity-75">
            Don't have an account? <Link to="/register" className="text-gradient fw-bold text-decoration-none">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
