import React from 'react';

function AdminFeatureReports() {
  // Ye "Dummy Data" hai, jo baad mein Backend/Database se aayega
  const reportData = [
    { id: 1, name: "Rahul Sharma", dept: "IT", type: "Sick Leave", duration: "2 Days", status: "Approved" },
    { id: 2, name: "Priya Verma", dept: "HR", type: "Annual Leave", duration: "5 Days", status: "Pending" },
    { id: 3, name: "Amit Patel", dept: "Sales", type: "Casual Leave", duration: "1 Day", status: "Rejected" },
    { id: 4, name: "Sneha Reddy", dept: "Marketing", type: "Sick Leave", duration: "3 Days", status: "Approved" },
    { id: 5, name: "Vikram Singh", dept: "Finance", type: "Annual Leave", duration: "10 Days", status: "Approved" },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Approved': return { color: '#198754', backgroundColor: '#e8f5e9', padding: '5px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold' };
      case 'Pending': return { color: '#856404', backgroundColor: '#fff3cd', padding: '5px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold' };
      case 'Rejected': return { color: '#721c24', backgroundColor: '#f8d7da', padding: '5px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold' };
      default: return {};
    }
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#fcfcfd', minHeight: '100vh' }}>
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 style={{ color: 'navy', fontWeight: '800' }}>Leave Analytics Report</h2>
          <p className="text-muted">Detailed overview of team attendance and leave patterns.</p>
        </div>
        <button className="btn btn-primary" style={{ borderRadius: '10px', padding: '10px 20px' }}>
          Download PDF Report
        </button>
      </div>

      {/* Table Container */}
      <div className="card border-0 shadow-sm" style={{ borderRadius: '20px', overflow: 'hidden' }}>
        <table className="table table-hover mb-0" style={{ verticalAlign: 'middle' }}>
          <thead style={{ backgroundColor: '#f8f9fa' }}>
            <tr>
              <th className="border-0 px-4 py-3">Employee Name</th>
              <th className="border-0 py-3">Department</th>
              <th className="border-0 py-3">Leave Type</th>
              <th className="border-0 py-3">Duration</th>
              <th className="border-0 py-3">Status</th>
              <th className="border-0 px-4 py-3 text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f1f1f1' }}>
                <td className="px-4 py-3">
                  <div className="d-flex align-items-center">
                    <div style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#0d6efd', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px', fontWeight: 'bold' }}>
                      {item.name.charAt(0)}
                    </div>
                    <strong>{item.name}</strong>
                  </div>
                </td>
                <td className="py-3 text-muted">{item.dept}</td>
                <td className="py-3">{item.type}</td>
                <td className="py-3">{item.duration}</td>
                <td className="py-3">
                  <span style={getStatusStyle(item.status)}>{item.status}</span>
                </td>
                <td className="px-4 py-3 text-end">
                  <button className="btn btn-sm btn-outline-secondary" style={{ borderRadius: '8px' }}>View Detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Analytics Summary Theory (Shortened) */}
      <div className="row mt-5">
        <div className="col-md-6">
          <div className="p-4 bg-white rounded-4 shadow-sm border">
            <h5>Why this data matters?</h5>
            <p className="small text-muted">Currently, this data is static. Once the backend is integrated, these rows will be fetched from your MongoDB/SQL database in real-time, allowing you to filter by date, department, and leave status instantly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminFeatureReports;
