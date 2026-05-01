import React from "react";
import { Link, NavLink } from "react-router-dom";

function Sidebar() {
  // Active link style function
  const activeClass = ({ isActive }) =>
    isActive ? "nav-link active bg-primary text-white shadow-sm rounded-3 py-2 px-3 mb-2 d-flex align-items-center"
             : "nav-link text-white-50 py-2 px-3 mb-2 hover-sidebar d-flex align-items-center";

  return (
    <div className="sidebar-container d-flex flex-column p-3 h-100 shadow" style={{ backgroundColor: "#1e293b", minHeight: "100vh" }}>

      {/* Brand Logo - Spacing Adjusted */}
      <div className="mb-4 mt-2 px-2 text-center text-md-start">
        <h4 className="text-info fw-bold mb-0">
          <i className="bi me-2"></i> ProLeave
        </h4>
        <small className="text-muted opacity-50" style={{ fontSize: '10px' }}>Employee Portal</small>
      </div>

      {/* Navigation Links - Headings Removed */}
      <div className="nav flex-column flex-grow-1">

        <NavLink to="/dashboard" className={activeClass}>
          <i className="bi bi-grid fs-5 me-3"></i>
          <span>Overview</span>
        </NavLink>

        <NavLink to="/apply" className={activeClass}>
          <i className="bi bi-plus-square fs-5 me-3"></i>
          <span>Request Leave</span>
        </NavLink>

        <NavLink to="/history" className={activeClass}>
          <i className="bi bi-clock-history fs-5 me-3"></i>
          <span>My History</span>
        </NavLink>

        <NavLink to="/calendar" className={activeClass}>
          <i className="bi bi-people fs-5 me-3"></i>
          <span>Team Calendar</span>
        </NavLink>

        <NavLink to="/about" className={activeClass}>
          <i className="bi bi-info-circle fs-5 me-3"></i>
          <span>System Info</span>
        </NavLink>

      </div>

      {/* Logout Section at the Bottom */}
      <div className="mt-auto mb-2 border-top border-secondary pt-3">
        <Link to="/" className="nav-link text-danger d-flex align-items-center px-3 fw-bold">
          <i className="bi bi-power fs-5 me-3"></i>
          <span>Sign Out</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
