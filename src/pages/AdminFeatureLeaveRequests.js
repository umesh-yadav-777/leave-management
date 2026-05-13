import React, { useState, useEffect } from "react";
import API from "../components/api";

function AdminFeatureLeaveRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = async () => {
    try {
      const res = await API.get("/api/leaves/manage/");
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching leaves");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleAction = async (id, newStatus) => {
    try {
      await API.patch(`/api/leaves/manage/${id}/`, { status: newStatus });
      window.dispatchEvent(new Event("leaveStatusChanged"));

      setRequests(
        requests.map((req) =>
          req.id === id ? { ...req, status: newStatus } : req,
        ),
      );

      alert(`Request ${newStatus} Successfully!`);
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update status");
    }
  };

  if (loading)
    return (
      <div className="p-5 text-center">
        <h5>Loading Leave Requests...</h5>
      </div>
    );

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#fcfcfd",
        minHeight: "100vh",
      }}
    >
      <div className="mb-4">
        <h2 style={{ color: "navy", fontWeight: "800" }}>
          Leave Approval Portal
        </h2>
        <p className="text-muted">
          Review and manage pending leave applications from employees.
        </p>
      </div>

      <div className="row">
        {requests.length === 0 ? (
          <div className="col-12 text-center py-5">
            <p className="text-muted">No leave requests found.</p>
          </div>
        ) : (
          requests.map((req) => (
            <div key={req.id} className="col-md-4 mb-4">
              <div
                className="card border-0 shadow-sm h-100"
                style={{
                  borderRadius: "20px",
                  borderTop: `5px solid ${req.status === "pending" ? "#ffc107" : req.status === "approved" ? "#198754" : "#dc3545"}`,
                }}
              >
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="fw-bold mb-0">
                        {req.user_name || req.employee_name || "Employee"}
                      </h5>
                      <small className="text-primary fw-bold">
                        {req.leave_type}
                      </small>
                    </div>
                    <span
                      className={`badge ${req.status === "pending" ? "bg-warning text-dark" : req.status === "approved" ? "bg-success" : "bg-danger"}`}
                    >
                      {req.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="bg-light p-3 rounded-3 mb-3">
                    <div className="small text-muted">Reason:</div>
                    <div className="fw-medium">
                      "{req.reason || "No reason provided"}"
                    </div>
                  </div>

                  <div className="d-flex justify-content-between small text-muted mb-4">
                    <span>
                      Start: <strong>{req.start_date}</strong>
                    </span>
                    <span>
                      End: <strong>{req.end_date}</strong>
                    </span>
                  </div>

                  {req.status === "pending" && (
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-success flex-grow-1"
                        onClick={() => handleAction(req.id, "approved")}
                        style={{ borderRadius: "10px" }}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-outline-danger flex-grow-1"
                        onClick={() => handleAction(req.id, "rejected")}
                        style={{ borderRadius: "10px" }}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminFeatureLeaveRequests;
