import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile)
        setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="d-flex"
      style={{
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#f0f2f5",
      }}
    >
      <nav
        style={{
          width: isSidebarOpen ? "260px" : "0px",
          minWidth: isSidebarOpen ? "260px" : "0px",
          transition: "all 0.3s ease",
          backgroundColor: "#1e293b",
          height: "100vh",
          overflowY: "auto",
          position: isMobile ? "fixed" : "relative",
          zIndex: 1100,
          left: isMobile && !isSidebarOpen ? "-260px" : "0",
        }}
      >
        <Sidebar />
      </nav>

      {isMobile && isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1050,
          }}
        />
      )}

      <div
        className="d-flex flex-column flex-grow-1"
        style={{
          height: "100vh",
          overflowX: "hidden",
          minWidth: 0, 
        }}
      >
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
          <h5
            className="mb-0 fw-bold text-secondary text-uppercase small"
            style={{ letterSpacing: "1px" }}
          >
            Leave Management System
          </h5>
        </nav>

        <div
          className="container-fluid p-4"
          style={{
            overflowY: "auto",
            flex: 1,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
