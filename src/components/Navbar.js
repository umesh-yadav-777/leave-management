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
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  const handleNotifClick = (note) => {
    setShow(false); 

    navigate("/admin-dashboard");

    console.log("Navigating to Admin Dashboard for:", note);
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4 shadow-sm sticky-top">
      <Link className="navbar-brand fw-bold" to="/admin-dashboard">
        <i className="bi bi-calendar-check me-2"></i>LeaveMS
      </Link>

      <div className="d-flex align-items-center">
        <div className="d-none d-md-block">
          <Link
            className="btn btn-outline-light border-0 me-2"
            to="/admin-dashboard"
          >
            Dashboard
          </Link>

          <Link className="btn btn-outline-light border-0 me-2" to="/about">
            About
          </Link>
        </div>

        <div className="position-relative">
          <span
            className="text-white mx-3"
            id="notificationBell"
            style={{ cursor: "pointer", fontSize: "1.2rem" }}
            onClick={() => setShow(!show)}
          >
            <i className="bi bi-bell"></i>
            {notifications.length > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.6rem" }}
              >
                {notifications.length}
              </span>
            )}
          </span>

          {show && (
            <div
              className="position-absolute bg-white text-dark shadow-lg rounded-3 p-2 mt-3 end-0"
              style={{ width: "250px", zIndex: 1050, border: "1px solid #ddd" }}
            >
              <h6 className="dropdown-header border-bottom mb-2 pb-2 fw-bold text-dark text-start">
                Notifications
              </h6>

              <div
                className="notification-list"
                style={{ maxHeight: "300px", overflowY: "auto" }}
              >
                {notifications.length > 0 ? (
                  notifications.map((note, index) => (
                    <div
                      key={index}
                      className="p-2 small mb-1 rounded hover-bg-light text-start"
                      style={{
                        cursor: "pointer",
                        backgroundColor: "#f8f9fa",
                        transition: "background 0.2s",
                      }}
                      onClick={() => handleNotifClick(note)}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#e9ecef")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "#f8f9fa")
                      }
                    >
                      <i className="bi bi-dot text-primary me-1"></i>
                      {note}
                      <div
                        className="text-muted"
                        style={{ fontSize: "10px", marginLeft: "15px" }}
                      >
                        Click to view on dashboard
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 small text-muted text-center">
                    No new updates
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <button
          className="btn btn-danger btn-sm ms-3 px-3 shadow-sm"
          onClick={handleLogout}
          style={{ borderRadius: "8px", fontWeight: "500" }}
        >
          <i className="bi bi-box-arrow-right me-1"></i> Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
