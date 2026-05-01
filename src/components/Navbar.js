import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const notifications = [
    "Leave Approved",
    "Leave Rejected",
    "New Leave Applied",
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">LeaveMS</span>

      <div>
        <Link className="btn btn-outline-light me-2" to="/dashboard">
          Dashboard
        </Link>

        <Link className="btn btn-outline-light me-2" to="/apply">
          Apply Leave
        </Link>

        <Link className="btn btn-outline-light me-2" to="/history">
          History
        </Link>

        <Link className="btn btn-outline-light me-2" to="/about">
          About
        </Link>

        {/* Notification */}
        <span
          className="text-white me-3"
          style={{ cursor: "pointer" }}
          onClick={() => setShow(!show)}
        >
          🔔
        </span>

        {/* Dropdown */}
        {show && (
          <div className="position-absolute bg-white p-2 mt-2">
            {notifications.map((note, index) => (
              <div key={index}>{note}</div>
            ))}
          </div>
        )}

        <button className="btn btn-danger ms-2" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
