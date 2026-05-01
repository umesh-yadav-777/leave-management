import React, { useState, useEffect } from 'react';

function AdminFeatureManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading State
  const [error, setError] = useState(null);    // Error State

  // Backend Simulation (Loading test karne ke liye)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 1.5 second ka delay takki spinner dikhe
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Asli project mein yahan fetch('/api/users') aayega
        setUsers([
          { id: 1, name: "Rahul Sharma", email: "rahul@company.com", role: "Developer", status: "Active" },
          { id: 2, name: "Priya Verma", email: "priya@company.com", role: "HR Manager", status: "Active" },
          { id: 3, name: "Amit Patel", email: "amit@company.com", role: "Designer", status: "Inactive" },
        ]);
        setLoading(false);
      } catch (err) {
        setError("Data load karne mein dikkat ho rahi hai. Kripya check karein.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const deleteUser = (id) => {
    if(window.confirm("Kya aap is user ko delete karna chahte hain?")) {
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
      alert("User deleted successfully!");
    }
  };

  const toggleStatus = (id) => {
    const updatedUsers = users.map(user => {
      if(user.id === id) {
        return { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#fcfcfd', minHeight: '100vh' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 style={{ color: 'navy', fontWeight: '800' }}>User Control Center</h2>
          {!loading && <p className="text-muted">Currently managing {users.length} employees</p>}
        </div>
        <button className="btn btn-primary shadow-sm" onClick={() => alert("Form opening...")} style={{ borderRadius: '10px' }}>
          <i className="bi bi-plus-lg me-2"></i>Add New User
        </button>
      </div>

      {/* ERROR UI */}
      {error && (
        <div className="alert alert-danger border-0 shadow-sm rounded-4 d-flex align-items-center">
          <i className="bi bi-exclamation-triangle-fill me-3 fs-4"></i>
          <div>{error}</div>
          <button className="btn btn-sm btn-danger ms-auto" onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}

      {/* SEARCH & FILTER SECTION */}
      <div className="row g-3 mb-4 bg-white p-3 rounded-4 shadow-sm mx-0 border">
        <div className="col-md-7">
          <div className="input-group">
            <span className="input-group-text bg-transparent border-end-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search employee by name, email or ID..."
              style={{ borderRadius: '0 10px 10px 0' }}
            />
          </div>
        </div>
        <div className="col-md-5 d-flex gap-2">
          <select className="form-select border-0 bg-light" style={{ borderRadius: '10px' }}>
            <option value="">All Departments</option>
            <option value="IT">IT Team</option>
            <option value="HR">HR Team</option>
          </select>
        </div>
      </div>

      {/* LOADING SPINNER */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <h6 className="mt-3 text-muted">Database se data aa raha hai...</h6>
        </div>
      ) : (
        /* TABLE SECTION */
        <div className="card border-0 shadow-sm" style={{ borderRadius: '20px', overflow: 'hidden' }}>
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th className="px-4 py-3">User Details</th>
                <th>Role</th>
                <th>Status</th>
                <th className="text-center">Quick Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-3">
                    <div className="fw-bold">{user.name}</div>
                    <div className="small text-muted">{user.email}</div>
                  </td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      onClick={() => toggleStatus(user.id)}
                      className={`badge border-0 py-2 px-3 ${user.status === 'Active' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}
                      style={{ borderRadius: '20px', fontSize: '12px', cursor: 'pointer' }}
                    >
                      {user.status}
                    </button>
                  </td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-info me-2">Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => deleteUser(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminFeatureManageUsers;
