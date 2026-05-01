import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  // State for Dropdowns
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Stats Data
  const stats = [
    { title: "Available Balance", count: 18, color: "#4e73df", icon: "bi-wallet2" },
    { title: "Used Leaves", count: 4, color: "#1cc88a", icon: "bi-calendar-check" },
    { title: "Pending Request", count: 1, color: "#f6c23e", icon: "bi-clock-history" },
  ];

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: "#f8f9fc", minHeight: "100vh" }}>

      {/* --- HEADER SECTION (Clickable Profile & Notifications) --- */}
      <div className="d-flex justify-content-between align-items-center mb-5 bg-white p-3 rounded-4 shadow-sm position-relative">
        <div>
          <h4 className="fw-bold mb-0 text-primary">Overview</h4>
          <small className="text-muted">Welcome back, Umesh Yadav</small>
        </div>

        <div className="d-flex align-items-center gap-3">
          {/* Notification Bell */}
          <div className="position-relative">
            <button
              className="btn btn-light rounded-circle border-0 p-2"
              onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
            >
              <i className="bi bi-bell fs-5 text-secondary"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.6rem'}}>2</span>
            </button>

            {showNotifications && (
              <div className="position-absolute end-0 mt-3 bg-white shadow-lg rounded-4 p-3 border-0" style={{ width: "280px", zIndex: 1050 }}>
                <h6 className="fw-bold border-bottom pb-2 mb-2">Notifications</h6>
                <div className="small py-2 border-bottom text-muted">✅ Your leave for <span className="fw-bold">Oct 12</span> was approved.</div>
                <div className="small py-2 text-muted"> Team meeting tomorrow at 10 AM.</div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="position-relative">
            <button
              className="btn bg-light border-0 rounded-pill d-flex align-items-center gap-2 px-3 py-1 shadow-sm"
              onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
            >
              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{width: '32px', height: '32px', fontSize: '0.8rem'}}>UY</div>
              <span className="small fw-bold d-none d-md-block">Umesh Yadav</span>
              <i className="bi bi-chevron-down small text-muted"></i>
            </button>

            {showProfileMenu && (
              <div className="position-absolute end-0 mt-3 bg-white shadow-lg rounded-4 overflow-hidden border-0" style={{ width: "200px", zIndex: 1050 }}>
                <button className="dropdown-item py-3 small border-bottom d-flex align-items-center gap-2" onClick={() => navigate('/profile')}>
                  <i className="bi bi-person-circle"></i> My Profile
                </button>
                <button className="dropdown-item py-3 small border-bottom d-flex align-items-center gap-2" onClick={() => navigate('/settings')}>
                  <i className="bi bi-gear"></i> Settings
                </button>
                <button className="dropdown-item py-3 small text-danger d-flex align-items-center gap-2" onClick={() => window.location.href='/'}>
                  <i className="bi bi-box-arrow-right"></i> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- QUICK STATS CARDS --- */}
      <div className="row g-4 mb-5">
        {stats.map((item, index) => (
          <div className="col-md-4" key={index}>
            <div className="card border-0 shadow-sm rounded-4 p-4 border-start border-5" style={{ borderLeftColor: item.color }}>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <div className="text-uppercase fw-bold mb-1" style={{ color: item.color, fontSize: '0.75rem', letterSpacing: '1px' }}>{item.title}</div>
                  <div className="h3 mb-0 fw-bold text-dark">{item.count} Days</div>
                </div>
                <div className="bg-light p-3 rounded-circle">
                   <i className={`bi ${item.icon} fs-3`} style={{ color: item.color }}></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- RECENT HISTORY SECTION (Now taking full width) --- */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0 d-flex align-items-center text-dark">
                <i className="bi bi-clock-history me-2 text-primary"></i> My Recent History
              </h5>
              <button className="btn btn-link text-primary text-decoration-none fw-bold small" onClick={() => navigate('/history')}>View All</button>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr className="small text-muted border-0 text-uppercase" style={{ letterSpacing: '1px' }}>
                    <th className="border-0 ps-3">Leave Type</th>
                    <th className="border-0">Period & Duration</th>
                    <th className="border-0 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="small">
                  <tr className="border-bottom">
                    <td className="fw-bold py-4 ps-3">
                       <i className="bi bi-circle-fill text-success me-2" style={{fontSize: '8px'}}></i> Sick Leave
                    </td>
                    <td>
                      <div className="fw-bold">10 Oct - 12 Oct</div>
                      <div className="text-muted" style={{fontSize: '0.75rem'}}>Duration: 2 Days</div>
                    </td>
                    <td className="text-center">
                      <span className="badge bg-success-subtle text-success px-4 py-2 rounded-pill border border-success-subtle">APPROVED</span>
                    </td>
                  </tr>
                  <tr className="border-bottom">
                    <td className="fw-bold py-4 ps-3">
                       <i className="bi bi-circle-fill text-danger me-2" style={{fontSize: '8px'}}></i> Casual Leave
                    </td>
                    <td>
                      <div className="fw-bold">01 Sep - 02 Sep</div>
                      <div className="text-muted" style={{fontSize: '0.75rem'}}>Duration: 2 Days</div>
                    </td>
                    <td className="text-center">
                      <span className="badge bg-danger-subtle text-danger px-4 py-2 rounded-pill border border-danger-subtle">REJECTED</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
