import React, { useState, useEffect, useCallback } from "react";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";
import API from '../components/api';

function AdminLayout({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [layoutData, setLayoutData] = useState({
    admin_name: "Admin User",
    role: "Super Admin",
    notifications: []
  });

  const fetchLayoutData = useCallback(async () => {
    try {
      const response = await API.get(`api/leaves/admin-summary/?refresh=${Date.now()}`);
      setLayoutData(response.data);
    } catch (error) {
      console.error("Layout fetch error:", error);
    }
  }, []);

  useEffect(() => {
    fetchLayoutData();

    const handleRefresh = () => {
        fetchLayoutData();
    };


    window.addEventListener("leaveStatusChanged", handleRefresh);
    window.addEventListener("storage", handleRefresh);

    return () => {
      window.removeEventListener("leaveStatusChanged", handleRefresh);
      window.removeEventListener("storage", handleRefresh);
    };
  }, [fetchLayoutData]);

  const getInitial = (name) => name ? name.charAt(0).toUpperCase() : "A";

  return (
    <div className="d-flex">
      <div className={`sidebar-fixed ${showSidebar ? "active" : ""}`} style={{ width: "250px", position: 'fixed', height: '100vh', zIndex: 1050, transition: '0.3s' }}>
        <AdminSidebar />
      </div>

      <div className="flex-grow-1 main-content" style={{ marginLeft: "250px", transition: '0.3s' }}>
        <div className="d-flex justify-content-between align-items-center px-4 py-3 bg-white shadow-sm sticky-top">
          <div className="d-flex align-items-center gap-3">
            <button className="btn d-md-none p-0 border-0" onClick={() => setShowSidebar(true)}>
              <i className="bi bi-list fs-3"></i>
            </button>
            <h5 className="mb-0 fw-bold text-muted">Admin Control</h5>
          </div>

          <div className="d-flex align-items-center gap-4">
            <div className="dropdown">
              <button className="btn position-relative p-0 border-0" data-bs-toggle="dropdown">
                <i className="bi bi-bell fs-4 text-secondary"></i>
                {layoutData.notifications.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '10px' }}>
                    {layoutData.notifications.length}
                  </span>
                )}
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-4 mt-3 p-0" style={{ width: '300px', overflow: 'hidden' }}>
                <li className="fw-bold px-3 py-2 bg-light border-bottom">Recent Updates</li>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {layoutData.notifications.length > 0 ? (
                    layoutData.notifications.map((note) => (
                        <li key={note.id} className="border-bottom">
                            <Link to="/admin/leaves" className="dropdown-item p-3 small text-wrap">
                                <div className="d-flex align-items-start gap-2">
                                    <i className="bi bi-circle-fill text-primary mt-1" style={{fontSize: '8px'}}></i>
                                    <div>{note.message}<br/><span className="text-primary fw-bold" style={{fontSize: '10px'}}>View Details →</span></div>
                                </div>
                            </Link>
                        </li>
                    ))
                    ) : (
                    <li className="p-4 small text-muted text-center">No pending requests</li>
                    )}
                </div>
              </ul>
            </div>

            <Link to="/admin/profile" className="text-decoration-none">
              <div className="d-flex align-items-center gap-2">
                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: '40px', height: '40px', fontSize: '14px', fontWeight: 'bold' }}>
                  {getInitial(layoutData.admin_name)}
                </div>
                <div className="d-none d-md-block text-start">
                  <p className="mb-0 small fw-bold text-dark" style={{ lineHeight: '1.2' }}>{layoutData.admin_name}</p>
                  <p className="mb-0 text-muted" style={{ fontSize: '10px' }}>{layoutData.role}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="p-0">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
