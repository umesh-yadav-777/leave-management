import React, { useState } from "react";

function LeaveHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const leaves = [
    { id: 1, type: "Casual", from: "2026-04-20", to: "2026-04-22", status: "Approved", approvedBy: "Admin", reason: "Personal work" },
    { id: 2, type: "Sick", from: "2026-04-10", to: "2026-04-11", status: "Pending", approvedBy: "-", reason: "High Fever" },
    { id: 3, type: "Paid", from: "2026-03-15", to: "2026-03-18", status: "Rejected", approvedBy: "Manager", reason: "Critical project deadline" },
    { id: 4, type: "Sick", from: "2026-02-10", to: "2026-02-12", status: "Approved", approvedBy: "Admin", reason: "Medical Checkup" },
  ];

  // Filtering Logic
  const filteredLeaves = leaves.filter((leave) => {
    const matchesSearch = leave.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || leave.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-sm border-0 rounded-4 overflow-hidden">

        {/* Header Section with Search & Filter */}
        <div className="card-header bg-white border-0 p-4">
          <div className="row align-items-center g-3">
            <div className="col-md-4">
              <h4 className="fw-bold mb-0 text-dark">My Leave History</h4>
              <p className="text-muted small mb-0">Track and manage all your leave requests</p>
            </div>

            {/* Search Bar */}
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text bg-light border-0"><i className="bi bi-search text-muted"></i></span>
                <input
                  type="text"
                  className="form-control bg-light border-0 py-2"
                  placeholder="Search by leave type..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filter Dropdown */}
            <div className="col-md-4 text-md-end">
              <div className="d-flex justify-content-md-end align-items-center gap-2">
                <span className="small fw-bold text-muted text-nowrap">Filter by:</span>
                <select
                  className="form-select bg-light border-0 py-2 w-auto"
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr className="text-muted small text-uppercase fw-bold" style={{ letterSpacing: '0.5px' }}>
                  <th className="px-4 py-3 border-0">ID</th>
                  <th className="py-3 border-0">Leave Type</th>
                  <th className="py-3 border-0">Duration & Dates</th>
                  <th className="py-3 border-0">Action By</th>
                  <th className="py-3 border-0 text-center">Status</th>
                  <th className="py-3 border-0 text-end px-4">Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeaves.length > 0 ? (
                  filteredLeaves.map((leave) => (
                    <tr key={leave.id} className="border-bottom">
                      <td className="px-4 py-3 text-muted">#{leave.id}</td>
                      <td className="py-3 fw-bold text-dark">
                        <i className={`bi bi-dot fs-1 align-middle ${
                          leave.type === "Sick" ? "text-danger" : "text-primary"
                        }`}></i>
                        {leave.type}
                      </td>
                      <td className="py-3">
                        <div className="fw-bold text-dark small">{new Date(leave.from).toLocaleDateString()} - {new Date(leave.to).toLocaleDateString()}</div>
                        <span className="text-muted" style={{fontSize: '0.75rem'}}>Duration: {Math.ceil((new Date(leave.to) - new Date(leave.from)) / (1000 * 60 * 60 * 24)) + 1} Days</span>
                      </td>
                      <td className="py-3 text-secondary small">{leave.approvedBy}</td>
                      <td className="py-3 text-center">
                        <span className={`badge px-3 py-2 rounded-pill border ${
                          leave.status === "Approved" ? "bg-success-subtle text-success border-success-subtle" :
                          leave.status === "Rejected" ? "bg-danger-subtle text-danger border-danger-subtle" :
                          "bg-warning-subtle text-warning border-warning-subtle"
                        }`} style={{ fontSize: '0.7rem' }}>
                          {leave.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 text-end px-4">
                        <button
                          className="btn btn-sm btn-outline-primary rounded-circle"
                          title="View Reason"
                          onClick={() => alert(`Reason: ${leave.reason}`)}
                        >
                          <i className="bi bi-info-lg"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">
                      <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                      No records found for the selected filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer info */}
        <div className="card-footer bg-white border-0 p-3 text-center border-top">
          <small className="text-muted">Showing {filteredLeaves.length} records</small>
        </div>
      </div>
    </div>
  );
}

export default LeaveHistory;
