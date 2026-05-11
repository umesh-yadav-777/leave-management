import React, { useState, useEffect } from "react";
import API from '../components/api';

function LeaveHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get("api/leaves/apply/");
        setLeaves(res.data);
      } catch (err) {
        console.error("History fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const filteredLeaves = leaves.filter((leave) => {
    const matchesSearch = leave.leave_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || leave.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  if (loading) return <div className="text-center py-5"><h5>Loading Leave History...</h5></div>;

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-sm border-0 rounded-4 overflow-hidden">

        {/* Header Section */}
        <div className="card-header bg-white border-0 p-4">
          <div className="row align-items-center g-3">
            <div className="col-md-4">
              <h4 className="fw-bold mb-0 text-dark">My Leave History</h4>
              <p className="text-muted small mb-0">Track and manage all your leave requests</p>
            </div>

            <div className="col-md-4">
              <div className="input-group shadow-sm rounded-3">
                <span className="input-group-text bg-white border-end-0"><i className="bi bi-search text-muted"></i></span>
                <input
                  type="text"
                  className="form-control border-start-0 py-2"
                  placeholder="Search by leave type..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-4 text-md-end">
              <div className="d-flex justify-content-md-end align-items-center gap-2">
                <span className="small fw-bold text-muted text-nowrap">Filter by:</span>
                <select
                  className="form-select bg-light border-0 py-2 w-auto shadow-sm"
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
                <tr className="text-muted small text-uppercase fw-bold" style={{ letterSpacing: '0.8px' }}>
                  <th className="px-4 py-3 border-0">Employee & ID</th>
                  <th className="py-3 border-0">Leave Type</th>
                  <th className="py-3 border-0">Duration & Dates</th>
                  <th className="py-3 border-0">Applied On</th>
                  <th className="py-3 border-0 text-center">Status</th>
                  <th className="py-3 border-0 text-end px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeaves.length > 0 ? (
                  filteredLeaves.map((leave) => (
                    <tr key={leave.id} className="border-bottom">
                      {/* PROFILE & ID SECTION */}
                      <td className="px-4 py-3">
                        <div className="d-flex align-items-center">
                          <div className="avatar-sm me-3 bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold"
                               style={{width: '40px', height: '40px', fontSize: '0.85rem', border: '2px solid #fff', shadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
                            {leave.user_name ? leave.user_name.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div>
                            <div className="fw-bold text-dark mb-0" style={{fontSize: '0.9rem'}}>{leave.user_name || "Employee"}</div>
                            <div className="text-muted" style={{fontSize: '0.72rem', letterSpacing: '0.5px'}}>
                              #LV-{String(leave.id).padStart(3, '0')}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 fw-bold text-dark">
                        <span className={`d-inline-block rounded-circle me-2 ${leave.leave_type === "Sick" ? "bg-danger" : "bg-primary"}`}
                              style={{width: '8px', height: '8px'}}></span>
                        {leave.leave_type}
                      </td>

                      <td className="py-3">
                        <div className="fw-bold text-dark small">
                          {new Date(leave.start_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} - {new Date(leave.end_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </div>
                        <div className="text-muted mt-1" style={{fontSize: '0.7rem'}}>
                          <i className="bi bi-calendar3 me-1"></i>
                          {Math.ceil((new Date(leave.end_date) - new Date(leave.start_date)) / (1000 * 60 * 60 * 24)) + 1} Days
                        </div>
                      </td>

                      <td className="py-3 text-secondary">
                        <div className="small mb-0">{new Date(leave.applied_on).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                        <div className="text-muted" style={{fontSize: '0.65rem'}}>Request Date</div>
                      </td>

                      <td className="py-3 text-center">
                        <span className={`badge px-3 py-2 rounded-pill border ${
                          leave.status.toLowerCase() === "approved" ? "bg-success-subtle text-success border-success-subtle" :
                          leave.status.toLowerCase() === "rejected" ? "bg-danger-subtle text-danger border-danger-subtle" :
                          "bg-warning-subtle text-warning border-warning-subtle"
                        }`} style={{ fontSize: '0.7rem', minWidth: '90px', fontWeight: '600' }}>
                          {leave.status.toUpperCase()}
                        </span>
                      </td>

                      <td className="py-3 text-end px-4">
                        <button
                          className="btn btn-sm btn-light border rounded-circle shadow-sm hover-elevate"
                          title="View Details"
                          onClick={() => alert(`Leave Reason: ${leave.reason}`)}
                          style={{width: '32px', height: '32px', padding: '0'}}
                        >
                          <i className="bi bi-eye text-primary" style={{fontSize: '0.85rem'}}></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">
                      <div className="py-4">
                        <i className="bi bi-clipboard-x fs-1 d-block mb-3 opacity-25"></i>
                        <p className="mb-0">No records found for the current selection.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer info */}
        <div className="card-footer bg-white border-0 p-3 text-center border-top">
          <small className="text-muted fw-medium">
            <i className="bi bi-info-circle me-1"></i>
            Showing {filteredLeaves.length} leave application records
          </small>
        </div>
      </div>
    </div>
  );
}

export default LeaveHistory;
