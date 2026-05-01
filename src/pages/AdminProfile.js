import React from 'react';

function AdminProfile() {
  return (
    <div style={{ padding: '30px', backgroundColor: '#fcfcfd', minHeight: '100vh' }}>
      <h2 style={{ color: 'navy', fontWeight: '800' }} className="mb-4">My Account Settings</h2>

      <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '20px', maxWidth: '600px' }}>
        <div className="text-center mb-4">
          <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mx-auto" style={{ width: '100px', height: '100px', fontSize: '40px' }}>
            A
          </div>
          <h4 className="mt-3 fw-bold">System Administrator</h4>
          <span className="badge bg-success-subtle text-success">Super Admin Access</span>
        </div>

        <form>
          <div className="mb-3">
            <label className="form-label small fw-bold">Official Email</label>
            <input type="email" className="form-control" defaultValue="admin@company.com" />
          </div>
          <div className="mb-3">
            <label className="form-label small fw-bold">New Password</label>
            <input type="password" className="form-control" placeholder="Leave blank to keep current" />
          </div>
          <button type="button" className="btn btn-primary w-100 py-2 mt-3" onClick={() => alert("Backend: Password hashed and saved!")}>
            Update Profile Information
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminProfile;
