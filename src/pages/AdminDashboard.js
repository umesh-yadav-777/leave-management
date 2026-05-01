import React from 'react';

function AdminDashboard() {
  const recentRequests = [
    { id: 1, name: "Rahul Sharma", type: "Sick Leave", date: "26 Apr", status: "Pending" },
    { id: 2, name: "Priya Verma", type: "Annual Leave", date: "25 Apr", status: "Approved" },
    { id: 3, name: "Amit Patel", type: "Casual Leave", date: "24 Apr", status: "Rejected" },
  ];

  return (
    <div style={{ padding: '30px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="mb-4">
        <h2 style={{ fontWeight: '800', color: '#1a237e' }}>Company Overview</h2>
        <p className="text-muted">Welcome back! Here is what's happening today.</p>
      </div>

      <div className="row mb-5">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(45deg, #0d6efd, #0b5ed7)', color: 'white', borderRadius: '15px' }}>
            <div className="card-body p-4">
              <h6>Total Employees</h6>
              <h2 className="display-4 fw-bold">124</h2>
              <small className="opacity-75">Active in system</small>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm" style={{ background: 'linear-gradient(45deg, #ffc107, #ffb300)', color: 'white', borderRadius: '15px' }}>
            <div className="card-body p-4">
              <h6>Pending Requests</h6>
              <h2 className="display-4 fw-bold">08</h2>
              <small className="opacity-75">Action required</small>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '20px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold m-0 text-navy">Recent Leave Activity</h5>
          <button className="btn btn-sm btn-link text-decoration-none">View Full History</button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Employee</th>
                <th>Type</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-end">Details</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((req) => (
                <tr key={req.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px', fontSize: '12px', fontWeight: 'bold' }}>
                        {req.name.charAt(0)}
                      </div>
                      <span className="fw-medium">{req.name}</span>
                    </div>
                  </td>
                  <td className="small">{req.type}</td>
                  <td className="small">{req.date}</td>
                  <td>
                    <span className={`badge rounded-pill ${
                      req.status === 'Approved' ? 'bg-success-subtle text-success' :
                      req.status === 'Rejected' ? 'bg-danger-subtle text-danger' : 'bg-warning-subtle text-warning'
                    }`} style={{ padding: '5px 12px' }}>
                      {req.status}
                    </span>
                  </td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-light border">Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
