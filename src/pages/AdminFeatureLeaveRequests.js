import React, { useState } from 'react';

function AdminFeatureLeaveRequests() {
  // 1. Mock Data: Backend se aane wali pending requests
  const [requests, setRequests] = useState([
    { id: 1, name: "Rahul Sharma", type: "Sick Leave", date: "2026-05-10", days: 2, reason: "Viral Fever", status: "Pending" },
    { id: 2, name: "Priya Verma", type: "Annual Leave", date: "2026-05-15", days: 5, reason: "Family Function", status: "Pending" },
    { id: 3, name: "Amit Patel", dept: "Sales", type: "Casual Leave", date: "2026-05-12", days: 1, reason: "Personal Work", status: "Pending" },
  ]);

  // 2. Backend Logic: Action (Approve/Reject) handle karne ke liye
  const handleAction = (id, newStatus) => {
    // Backend Logic: Yahan API call hogi: axios.put('/api/leaves/' + id, { status: newStatus })
    const updatedRequests = requests.map(req => {
      if (req.id === id) {
        return { ...req, status: newStatus };
      }
      return req;
    });

    setRequests(updatedRequests);
    alert(`Request ${newStatus} Successfully! Employee ko notification bhej di gayi hai.`);
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#fcfcfd', minHeight: '100vh' }}>
      <div className="mb-4">
        <h2 style={{ color: 'navy', fontWeight: '800' }}>Leave Approval Portal</h2>
        <p className="text-muted">Review and manage pending leave applications from employees.</p>
      </div>

      <div className="row">
        {requests.map((req) => (
          <div key={req.id} className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm" style={{ borderRadius: '20px', borderTop: `5px solid ${req.status === 'Pending' ? '#ffc107' : req.status === 'Approved' ? '#198754' : '#dc3545'}` }}>
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h5 className="fw-bold mb-0">{req.name}</h5>
                    <small className="text-primary fw-bold">{req.type}</small>
                  </div>
                  <span className={`badge ${req.status === 'Pending' ? 'bg-warning text-dark' : req.status === 'Approved' ? 'bg-success' : 'bg-danger'}`}>
                    {req.status}
                  </span>
                </div>

                <div className="bg-light p-3 rounded-3 mb-3">
                  <div className="small text-muted">Reason:</div>
                  <div className="fw-medium">"{req.reason}"</div>
                </div>

                <div className="d-flex justify-content-between small text-muted mb-4">
                  <span>Start Date: <strong>{req.date}</strong></span>
                  <span>Duration: <strong>{req.days} Days</strong></span>
                </div>

                {req.status === 'Pending' && (
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-success flex-grow-1"
                      onClick={() => handleAction(req.id, 'Approved')}
                      style={{ borderRadius: '10px' }}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-outline-danger flex-grow-1"
                      onClick={() => handleAction(req.id, 'Rejected')}
                      style={{ borderRadius: '10px' }}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Backend Workflow Explanation */}
      <div className="mt-5 p-4 rounded-4" style={{ backgroundColor: '#eef2ff', color: '#3730a3' }}>
        <h5><i className="bi bi-info-circle"></i> Backend Integration Workflow:</h5>
        <ul className="mt-3">
          <li><strong>Real-time Update:</strong> Jab employee chutti apply karega, backend <strong>Socket.io</strong> ya <strong>Push Notification</strong> ke zariye admin ko turant alert dega.</li>
          <li><strong>Balance Check:</strong> Approve karne se pehle backend khud check karega ki employee ke account mein kitni chuttiyan bachi hain.</li>
          <li><strong>Email Automation:</strong> Jaise hi aap 'Approve' click karenge, backend <strong>Nodemailer</strong> ka use karke employee ko ek official confirmation email bhej dega.</li>
        </ul>
      </div>
    </div>
  );
}

export default AdminFeatureLeaveRequests;
