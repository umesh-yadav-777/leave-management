import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import API from '../components/api';

function AdminDashboard() {
  const [summary, setSummary] = useState({
    pending_requests: 0,
    on_leave_today: 0,
    total_employees: 0,
    recent_data: []
  });

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedReq, setSelectedReq] = useState(null);

  const fetchAdminData = async () => {
    try {
      const response = await API.get('api/leaves/admin-summary/');
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
      // Backend update
      await API.patch(`api/leaves/manage/${selectedReq.id}/`, { status: status });
      setShowModal(false);

      
      window.dispatchEvent(new Event("leaveStatusChanged"));
      localStorage.setItem("last_update", Date.now());

      fetchAdminData();
      alert(`Leave ${status} successfully!`);
    } catch (error) {
      alert("Error updating status");
    }
  };

  if (loading) return <div className="p-5 text-center">Loading Dashboard...</div>;

  return (
    <div style={{ padding: '30px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="row mb-5 g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100" style={{ background: 'linear-gradient(45deg, #0d6efd, #0b5ed7)', color: 'white', borderRadius: '15px' }}>
                <div className="card-body p-4">
                    <h6>Total Employees</h6>
                    <h2 className="display-4 fw-bold">{summary.total_employees}</h2>
                    <small className="opacity-75">Active in system</small>
                </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100" style={{ background: 'linear-gradient(45deg, #ffc107, #ffb300)', color: 'white', borderRadius: '15px' }}>
                <div className="card-body p-4">
                    <h6>Pending Requests</h6>
                    <h2 className="display-4 fw-bold">{summary.pending_requests}</h2>
                    <small className="opacity-75">Action required</small>
                </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100" style={{ background: 'linear-gradient(45deg, #20c997, #198754)', color: 'white', borderRadius: '15px' }}>
                <div className="card-body p-4">
                    <h6>On Leave Today</h6>
                    <h2 className="display-4 fw-bold">{summary.on_leave_today}</h2>
                    <small className="opacity-75">Employees out of office</small>
                </div>
            </div>
          </div>
      </div>

      <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '20px' }}>
        <h5 className="fw-bold mb-4 text-navy">Recent Leave Activity</h5>
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
              {summary.recent_data.map((req) => (
                <tr key={req.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px', fontSize: '12px', fontWeight: 'bold' }}>
                        {(req.employee_name || req.username || "U").charAt(0)}
                      </div>
                      <span className="fw-medium">{req.employee_name || req.username}</span>
                    </div>
                  </td>
                  <td className="small">{req.leave_type}</td>
                  <td className="small">{req.start_date} to {req.end_date}</td>
                  <td>
                    <span className={`badge rounded-pill ${
                      req.status.toLowerCase() === 'approved' ? 'bg-success-subtle text-success' :
                      req.status.toLowerCase() === 'rejected' ? 'bg-danger-subtle text-danger' : 'bg-warning-subtle text-warning'
                    }`} style={{ padding: '5px 12px', textTransform: 'capitalize' }}>
                      {req.status}
                    </span>
                  </td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-light border px-3" onClick={() => handleReview(req)}>Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Review Leave Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReq && (
            <div>
              <p><strong>Employee:</strong> {selectedReq.employee_name || selectedReq.username}</p>
              <p><strong>Leave Type:</strong> {selectedReq.leave_type}</p>
              <p><strong>Duration:</strong> {selectedReq.start_date} to {selectedReq.end_date}</p>
              <p><strong>Reason:</strong> {selectedReq.reason || "No reason provided"}</p>
              <hr />
              <p className="text-muted small">Choose an action to update the status.</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => updateStatus('rejected')}>Reject</Button>
          <Button variant="success" onClick={() => updateStatus('approved')}>Approve</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminDashboard;
