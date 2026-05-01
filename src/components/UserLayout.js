import React, { useState } from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Sidebar width configuration
  const sidebarWidth = isSidebarOpen ? "260px" : "0px";

  return (
    <div className="d-flex" style={{ height: "100vh", overflow: "hidden" }}>

      {/* 1. Sidebar - Fixed Height and Scrollable inside if needed */}
      <nav
        style={{
          width: sidebarWidth,
          minWidth: sidebarWidth,
          transition: "all 0.3s ease",
          backgroundColor: "#1e293b",
          height: "100vh", // Poori screen ki height
          overflowY: "auto", // Agar links zyada hon toh sidebar ke andar scroll hoga
          position: "relative",
          zIndex: 1050
        }}
      >
        <Sidebar />
      </nav>

      {/* 2. Main Content Area - Iska apna scrollbar hoga */}
      <div
        className="d-flex flex-column"
        style={{
          flex: 1,
          height: "100vh",
          overflowY: "auto", // Dashboard scroll yahan hoga
          backgroundColor: "#f0f2f5"
        }}
      >
        {/* Top Navbar - Sticky inside the scrollable content area */}
        <nav
          className="navbar navbar-expand-lg navbar-light px-4 py-3 sticky-top shadow-sm bg-white"
          style={{ zIndex: 1040 }}
        >
          <button
            className="btn btn-outline-secondary me-3 border-0"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <i className="bi bi-list fs-4"></i>
          </button>
          <h5 className="mb-0 fw-bold text-secondary text-uppercase small" style={{ letterSpacing: '1px' }}>
            Leave Management System
          </h5>
        </nav>

        {/* Dashboard Content - Scrollable area */}
        <div className="container-fluid p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
