import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from '../components/api';

function UserDashboard() {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // --- NAYA FUNCTION: NOTIFICATIONS CLEAR KARNE KE LIYE ---
  const clearAllNotifications = async () => {
    try {
      await API.post("accounts/clear-notifications/");
      setDashboardData(prev => ({ ...prev, notifications: [] }));
    } catch (err) {
      console.error("Clear karne mein error:", err);
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await API.get("api/dashboard/employee-stats/");
        setDashboardData(res.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
      <div className="spinner-border text-primary" role="status"></div>
      <h5 className="ms-3 mb-0">Loading your overview...</h5>
    </div>
  );

  const stats = [
    { title: "Available Balance", count: dashboardData?.stats?.available || 0, color: "#4e73df", icon: "bi-wallet2" },
    { title: "Used Leaves", count: dashboardData?.stats?.used || 0, color: "#1cc88a", icon: "bi-calendar-check" },
    { title: "Pending Request", count: dashboardData?.stats?.pending || 0, color: "#f6c23e", icon: "bi-clock-history" },
  ];

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: "#f8f9fc", minHeight: "100vh" }}>
      <div className="d-flex justify-content-between align-items-center mb-5 bg-white p-3 rounded-4 shadow-sm position-relative">
        <div>
          <h4 className="fw-bold mb-0 text-primary">Overview</h4>
          <small className="text-muted">Welcome back, {dashboardData?.user_full_name || "User"}</small>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="position-relative">
            <button
              className="btn btn-light rounded-circle border-0 p-2"
              onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
            >
              <i className="bi bi-bell fs-5 text-secondary"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.6rem'}}>
                {dashboardData?.notifications?.length || 0}
              </span>
            </button>

            {showNotifications && (
              <div className="position-absolute end-0 mt-3 bg-white shadow-lg rounded-4 p-3 border-0" style={{ width: "280px", zIndex: 1050 }}>
                {/* --- NAYA BUTTON: CLEAR ALL --- */}
                <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
                  <h6 className="fw-bold mb-0">Notifications</h6>
                  {dashboardData?.notifications?.length > 0 && (
                    <button className="btn btn-sm text-primary p-0 small fw-bold" onClick={clearAllNotifications}>
                      Clear All
                    </button>
                  )}
                </div>

                <div style={{maxHeight: '300px', overflowY: 'auto'}}>
                  {dashboardData?.notifications?.length > 0 ? (
                    dashboardData.notifications.map((note, i) => (
                      <div key={i} className="small py-2 border-bottom text-muted">
                        <i className="bi bi-info-circle me-2 text-primary"></i>
                        {note.message}
                      </div>
                    ))
                  ) : (
                    <div className="small py-2 text-muted text-center">No new notifications</div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="position-relative">
            <button
              className="btn bg-light border-0 rounded-pill d-flex align-items-center gap-2 px-3 py-1 shadow-sm"
              onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
            >
              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{width: '32px', height: '32px', fontSize: '0.8rem'}}>
                {dashboardData?.user_full_name ? dashboardData.user_full_name.charAt(0).toUpperCase() : "U"}
              </div>
              <span className="small fw-bold d-none d-md-block">{dashboardData?.user_full_name || "User"}</span>
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
                <button className="dropdown-item py-3 small text-danger d-flex align-items-center gap-2" onClick={() => { localStorage.clear(); window.location.href='/'; }}>
                  <i className="bi bi-box-arrow-right"></i> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- QUICK STATS CARDS (Waisa hi hai) --- */}
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

      {/* --- RECENT HISTORY SECTION (Waisa hi hai) --- */}
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
                  {dashboardData?.history?.length > 0 ? (
                    dashboardData.history.map((leave) => (
                      <tr key={leave.id} className="border-bottom">
                        <td className="fw-bold py-4 ps-3">
                           <i className={`bi bi-circle-fill me-2 ${leave.leave_type === 'Sick' ? 'text-danger' : 'text-primary'}`} style={{fontSize: '8px'}}></i> {leave.leave_type}
                        </td>
                        <td>
                          <div className="fw-bold">
                            {new Date(leave.start_date).toLocaleDateString('en-GB', {day: '2-digit', month: 'short'})} - {new Date(leave.end_date).toLocaleDateString('en-GB', {day: '2-digit', month: 'short'})}
                          </div>
                          <div className="text-muted" style={{fontSize: '0.75rem'}}>Duration: {leave.duration} Days</div>
                        </td>
                        <td className="text-center">
                          <span className={`badge px-4 py-2 rounded-pill border ${
                            leave.status.toLowerCase() === "approved" ? "bg-success-subtle text-success border-success-subtle" :
                            leave.status.toLowerCase() === "rejected" ? "bg-danger-subtle text-danger border-danger-subtle" :
                            "bg-warning-subtle text-warning border-warning-subtle"
                          }`}>
                            {leave.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center py-4 text-muted">No recent leave history found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
