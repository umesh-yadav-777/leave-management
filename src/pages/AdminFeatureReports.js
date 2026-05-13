import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import API from "../components/api";
import * as bootstrap from 'bootstrap';

function AdminReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLeave, setSelectedLeave] = useState(null);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await API.get("accounts/leave-reports/");
      setReports(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Report Error:", err);
      setError("Failed to fetch reports.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleShowDetails = (item) => {
    setSelectedLeave(item);
    const modalElement = document.getElementById('leaveDetailModal');
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
      modalInstance.show();
    }
  };

  const handleDownloadPDF = () => {
    if (reports.length === 0) return alert("No data available to download!");
    const doc = new jsPDF();
    doc.text("Leave Analytics Report", 14, 20);

    const tableRows = reports.map((item) => [
      item.employee_name || item.username || "N/A",
      item.department || "General",
      item.leave_type,
      item.duration,
      item.status,
    ]);

    autoTable(doc, {
      head: [["Employee", "Dept", "Type", "Duration", "Status"]],
      body: tableRows,
      startY: 25,
    });
    doc.save("Leave_Report.pdf");
  };

  const getStatusBadge = (status) => {
    const s = status ? status.toLowerCase() : "";
    if (s === "approved") return "bg-success text-white";
    if (s === "rejected") return "bg-danger text-white";
    return "bg-warning text-dark";
  };

  return (
    <div className="container-fluid p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-navy">Leave Analytics Report</h2>
        <button
          className="btn btn-primary shadow-sm"
          onClick={handleDownloadPDF}
          disabled={loading || reports.length === 0}
        >
          Download PDF Report
        </button>
      </div>

      {error && <div className="alert alert-danger shadow-sm">{error}</div>}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
          <p className="mt-2 text-muted fw-bold">Loading analytics from server...</p>
        </div>
      ) : (
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4">Employee Name</th>
                  <th>Department</th>
                  <th>Leave Type</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.length > 0 ? (
                  reports.map((item) => (
                    <tr key={item.id}>
                      <td className="ps-4 fw-bold">{item.employee_name || item.username}</td>
                      <td>{item.department || "N/A"}</td>
                      <td>{item.leave_type}</td>
                      <td>{item.duration} Days</td>
                      <td>
                        <span className={`badge rounded-pill px-3 ${getStatusBadge(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-outline-primary px-3"
                          onClick={() => handleShowDetails(item)}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">No report data found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div
        className="modal fade"
        id="leaveDetailModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="leaveDetailModalLabel"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
            <div className="modal-header bg-primary text-white" style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
              <h5 className="modal-title" id="leaveDetailModalLabel">Application Details</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body p-4 text-start">
              {selectedLeave ? (
                <div className="lh-lg">
                  <p className="mb-2"><strong>Employee:</strong> {selectedLeave.employee_name || selectedLeave.username}</p>
                  <p className="mb-2"><strong>Leave Type:</strong> {selectedLeave.leave_type}</p>
                  <p className="mb-2"><strong>Duration:</strong> {selectedLeave.duration} Days</p>
                  <p className="mb-2"><strong>Reason:</strong> {selectedLeave.reason || "No reason provided."}</p>
                  <p className="mb-0"><strong>Status:</strong> <span className={`badge ms-1 ${getStatusBadge(selectedLeave.status)}`}>{selectedLeave.status}</span></p>
                </div>
              ) : <div className="text-center py-3"><div className="spinner-border spinner-border-sm text-primary me-2"></div>Loading details...</div>}
            </div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-secondary px-4" data-bs-dismiss="modal" style={{ borderRadius: '8px' }}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminReports;
