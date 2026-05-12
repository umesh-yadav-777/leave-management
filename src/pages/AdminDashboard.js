import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import API from "../components/api";

function AdminDashboard() {
  const [summary, setSummary] = useState({
    pending_requests: 0,
    on_leave_today: 0,
    total_employees: 0,
    recent_data: [],
  });

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedReq, setSelectedReq] = useState(null);

  const fetchAdminData = async () => {
    try {
      // Refresh parameter taaki cache issues na ho
      const response = await API.get(
        "api/leaves/admin-summary/?refresh=" + Date.now(),
      );
      setSummary(response.data);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleReview = (req) => {
    setSelectedReq(req);
    setShowModal(true);
  };

  const updateStatus = async (status) => {
    try {
      // Backend update - Serializer ke hisaab se path match kiya gaya hai
      await API.patch(`api/leaves/manage/${selectedReq.id}/`, {
        status: status,
      });
      setShowModal(false);

      // Dusre components ko refresh karne ke liye event
      window.dispatchEvent(new Event("leaveStatusChanged"));

      fetchAdminData(); // Current dashboard refresh karein
      alert(`Leave ${status} successfully!`);
    } catch (error) {
      alert("Error updating status");
    }
  };

  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      {/* Stat Cards */}
      <div className="row mb-5 g-4">
        <div className="col-md-4">
          <div
            className="card border-0 shadow-sm h-100"
            style={{
              background: "linear-gradient(45deg, #0d6efd, #0b5ed7)",
              color: "white",
              borderRadius: "15px",
            }}
          >
            <div className="card-body p-4">
              <h6>Total Employees</h6>
              <h2 className="display-4 fw-bold">{summary.total_employees}</h2>
              <small className="opacity-75">Active in system</small>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="card border-0 shadow-sm h-100"
            style={{
              background: "linear-gradient(45deg, #ffc107, #ffb300)",
              color: "white",
              borderRadius: "15px",
            }}
          >
            <div className="card-body p-4">
              <h6>Pending Requests</h6>
              <h2 className="display-4 fw-bold">{summary.pending_requests}</h2>
              <small className="opacity-75">Action required</small>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="card border-0 shadow-sm h-100"
            style={{
              background: "linear-gradient(45deg, #20c997, #198754)",
              color: "white",
              borderRadius: "15px",
            }}
          >
            <div className="card-body p-4">
              <h6>On Leave Today</h6>
              <h2 className="display-4 fw-bold">{summary.on_leave_today}</h2>
              <small className="opacity-75">Employees out of office</small>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div
        className="card border-0 shadow-sm p-4"
        style={{ borderRadius: "20px" }}
      >
        <h5 className="fw-bold mb-4" style={{ color: "#1e293b" }}>
          Recent Leave Activity
        </h5>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Employee</th>
                <th>Type</th>
                <th>Date Range</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {summary.recent_data &&
                summary.recent_data.map((req) => (
                  <tr key={req.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div
                          className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center me-2"
                          style={{
                            width: "35px",
                            height: "35px",
                            fontSize: "13px",
                            fontWeight: "bold",
                          }}
                        >
                          {/* Serializer keys fallback logic */}
                          {(
                            req.employee_name ||
                            req.user_name ||
                            req.username ||
                            "U"
                          )
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                        <span className="fw-medium">
                          {/* Serializer se employee_name sabse best hai */}
                          {req.employee_name || req.user_name || req.username}
                        </span>
                      </div>
                    </td>
                    <td className="small">{req.leave_type}</td>
                    <td className="small">
                      {req.start_date} to {req.end_date}
                    </td>
                    <td>
                      <span
                        className={`badge rounded-pill ${
                          req.status.toLowerCase() === "approved"
                            ? "bg-success-subtle text-success"
                            : req.status.toLowerCase() === "rejected"
                              ? "bg-danger-subtle text-danger"
                              : "bg-warning-subtle text-warning"
                        }`}
                        style={{
                          padding: "6px 12px",
                          textTransform: "capitalize",
                        }}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-outline-primary px-3 shadow-sm"
                        onClick={() => handleReview(req)}
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              {(!summary.recent_data || summary.recent_data.length === 0) && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    No recent activities found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fw-bold">Review Leave Request</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-4">
          {selectedReq && (
            <div className="px-2">
              <div className="mb-3">
                <label className="text-muted small d-block">
                  Employee Name
                </label>
                <span className="fw-bold h5 text-dark">
                  {selectedReq.employee_name ||
                    selectedReq.user_name ||
                    selectedReq.username}
                </span>
              </div>
              <div className="row g-3 mb-3">
                <div className="col-6">
                  <label className="text-muted small d-block">Leave Type</label>
                  <span className="fw-medium">{selectedReq.leave_type}</span>
                </div>
                <div className="col-6">
                  <label className="text-muted small d-block">
                    Application Date
                  </label>
                  <span className="fw-medium text-primary">
                    {selectedReq.applied_on
                      ? new Date(selectedReq.applied_on).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )
                      : "N/A"}
                  </span>
                </div>
              </div>
              <div className="mb-3">
                <label className="text-muted small d-block">Duration</label>
                <span className="fw-medium">
                  {selectedReq.start_date}{" "}
                  <i className="bi bi-arrow-right mx-1"></i>{" "}
                  {selectedReq.end_date}
                </span>
              </div>
              <div className="p-3 bg-light rounded shadow-sm border-start border-primary border-4">
                <label className="text-muted small d-block mb-1">Reason</label>
                <p className="mb-0 italic">
                  "{selectedReq.reason || "No reason provided"}"
                </p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button
            variant="outline-danger"
            className="px-4"
            onClick={() => updateStatus("rejected")}
          >
            Reject
          </Button>
          <Button
            variant="success"
            className="px-4"
            onClick={() => updateStatus("approved")}
          >
            Approve
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminDashboard;
