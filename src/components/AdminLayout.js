import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";

function AdminLayout({ children }) {
  // Mobile par sidebar dikhane/chhupane ke liye state
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="d-flex">
      {/* Sidebar Wrapper - Mobile responsive classes ke saath */}
      <div
        className={`sidebar-fixed ${showSidebar ? "active" : ""}`}
        style={{ width: "250px", position: 'fixed', height: '100vh', zIndex: 1050, transition: '0.3s' }}
      >
        <AdminSidebar />
      </div>

      {/* Mobile Overlay (Jab sidebar khule toh background click se band ho jaye) */}
      {showSidebar && (
        <div
          className="d-md-none"
          onClick={() => setShowSidebar(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1040 }}
        ></div>
      )}

      {/* Main Content Area */}
      <div className="flex-grow-1 main-content" style={{ marginLeft: "250px", transition: '0.3s' }}>

        {/* --- TOP BAR --- */}
        <div className="d-flex justify-content-between align-items-center px-4 py-3 bg-white shadow-sm sticky-top">
          <div className="d-flex align-items-center gap-3">
            {/* Hamburger Button - Sirf Mobile par dikhega */}
            <button className="btn d-md-none p-0 border-0" onClick={() => setShowSidebar(true)}>
              <i className="bi bi-list fs-3"></i>
            </button>
            <h5 className="mb-0 fw-bold text-muted">Admin Control</h5>
          </div>

          <div className="d-flex align-items-center gap-4">
            {/* Notification Bell */}
            <div className="dropdown">
              <button className="btn position-relative p-0 border-0" data-bs-toggle="dropdown">
                <i className="bi bi-bell fs-4 text-secondary"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '10px' }}>
                  3
                </span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-4 mt-3 p-3" style={{ width: '300px' }}>
                <li className="fw-bold px-2 mb-2">Recent Updates</li>
                <li className="p-2 border-bottom small"><strong>Rahul</strong> ne leave apply ki.</li>
                <li className="p-2 border-bottom small"><strong>Priya</strong> ne profile update ki.</li>
              </ul>
            </div>

            {/* Profile Avatar */}
            <Link to="/admin/profile" className="text-decoration-none">
              <div className="d-flex align-items-center gap-2">
                <div
                  className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                  style={{ width: '40px', height: '40px', fontSize: '14px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  UY
                </div>
                <div className="d-none d-md-block text-start">
                  <p className="mb-0 small fw-bold text-dark" style={{ lineHeight: '1.2' }}>Admin User</p>
                  <p className="mb-0 text-muted" style={{ fontSize: '10px' }}>Super Admin</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-0">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
