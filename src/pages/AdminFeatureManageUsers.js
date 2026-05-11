import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminFeatureManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: '', fullName: '', email: '', role: 'employee', password: '' });

  const API_URL = 'http://127.0.0.1:8000/accounts/manage-users/';
  const REGISTER_URL = 'http://127.0.0.1:8000/accounts/register/';

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const response = await axios.get(API_URL, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError("Unable to load data. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Modal Open karne ke liye
  const handleOpenModal = (user = null) => {
    if (user) {
      setIsEditMode(true);
      setCurrentUser({ id: user.id, fullName: user.first_name, email: user.username, role: user.role, password: '' });
    } else {
      setIsEditMode(false);
      setCurrentUser({ id: '', fullName: '', email: '', role: 'employee', password: '' });
    }
    setShowModal(true);
  };

  // Form Submit (Add ya Edit dono ke liye)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    try {
      if (isEditMode) {
        // Edit API Call (PATCH)
        await axios.patch(`${API_URL}${currentUser.id}/`, {
            first_name: currentUser.fullName,
            role: currentUser.role
        }, { headers: { 'Authorization': `Bearer ${token}` } });
        alert("User updated!");
      } else {
        // Add User API Call (POST to Register)
        await axios.post(REGISTER_URL, currentUser);
        alert("New user added!");
      }
      setShowModal(false);
      fetchData(); // List refresh karein
    } catch (err) {
      alert("Error: The action failed. " + (err.response?.data?.error || ""));
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Do you want to delete this user?")) {
      try {
        const token = localStorage.getItem('access_token');
        await axios.delete(`${API_URL}${id}/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setUsers(users.filter(u => u.id !== id));
      } catch (err) { alert("Delete failed!"); }
    }
  };

  const toggleStatus = async (id) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.patch(`${API_URL}${id}/`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchData();
    } catch (err) { alert("Status update fail!"); }
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#fcfcfd', minHeight: '100vh' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 style={{ color: 'navy', fontWeight: '800' }}>User Control Center</h2>
          <p className="text-muted">Total Employees: {users.length}</p>
        </div>
        <button className="btn btn-primary shadow-sm" onClick={() => handleOpenModal()} style={{ borderRadius: '10px' }}>
          <i className="bi bi-plus-lg me-2"></i>Add New User
        </button>
      </div>

      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
      ) : (
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
                    <div className="fw-bold">{user.first_name || user.username}</div>
                    <div className="small text-muted">{user.username}</div>
                  </td>
                  <td className="text-capitalize">{user.role}</td>
                  <td>
                    <button onClick={() => toggleStatus(user.id)} className={`badge border-0 py-2 px-3 ${user.is_active ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`} style={{ borderRadius: '20px', cursor: 'pointer' }}>
                      {user.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-info me-2" onClick={() => handleOpenModal(user)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => deleteUser(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* BOOTSTRAP MODAL FOR ADD/EDIT */}
      {showModal && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow" style={{ borderRadius: '20px' }}>
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">{isEditMode ? 'Edit Employee' : 'Add New Employee'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" value={currentUser.fullName} onChange={(e) => setCurrentUser({...currentUser, fullName: e.target.value})} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email (Username)</label>
                    <input type="email" className="form-control" value={currentUser.email} disabled={isEditMode} onChange={(e) => setCurrentUser({...currentUser, email: e.target.value})} required />
                  </div>
                  {!isEditMode && (
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={(e) => setCurrentUser({...currentUser, password: e.target.value})} required />
                    </div>
                  )}
                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select className="form-select" value={currentUser.role} onChange={(e) => setCurrentUser({...currentUser, role: e.target.value})}>
                      <option value="employee">Employee</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button type="button" className="btn btn-light" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">{isEditMode ? 'Update User' : 'Register User'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminFeatureManageUsers;
