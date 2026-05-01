import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();

  // --- Naya "Backend Simulation" Logout Function ---
  const handleLogout = async () => {
    // 1. Pehle hum user ko message dikhayenge ki process shuru hai
    console.log("Logout Initiated...");

    // 2. SERVER DELAY (Simulation):
    // Hum 1.5 second ka intezaar kar rahe hain, jaise asli backend response deta hai
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 3. CLIENT CLEANUP:
    // Server se "OK" milne ke baad browser ki memory saaf karna
    localStorage.clear();
    sessionStorage.clear();

    // 4. REDIRECT:
    // Finally user ko bahar bhej dena
    alert("Backend Process Complete: User Session Closed.");
    navigate("/");
  };

  return (
    <div className="sidebar-container d-flex flex-column p-4 h-100">
      <div className="mb-5">
        <h4 className="text-warning fw-bold mb-0"> Admin Panel</h4>
      </div>

      <div className="nav flex-column gap-3">
        <NavLink to="/admin/users" className="nav-link text-white-50">
          <i className="bi bi-people"></i> Manage Users
        </NavLink>

        <NavLink to="/admin/leaves" className="nav-link text-white-50">
          <i className="bi bi-file-earmark-text"></i> Leave Requests
        </NavLink>

        <NavLink to="/admin/reports" className="nav-link text-white-50">
          <i className="bi bi-bar-chart"></i> Reports
        </NavLink>

        <NavLink to="/admin/settings" className="nav-link text-white-50">
          <i className="bi bi-gear"></i> Settings
        </NavLink>

        <NavLink to="/admin/profile" className="nav-link text-white-50">
          <i className="bi bi-person-circle"></i> My Profile
        </NavLink>

        {/* Logout Button: Is par click karte hi delay dikhega */}
        <div
          onClick={handleLogout}
          className="nav-link text-danger mt-5"
          style={{ cursor: "pointer" }}
        >
          <i className="bi bi-power"></i> Logout
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
