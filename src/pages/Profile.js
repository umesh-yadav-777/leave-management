import React from "react";

function Profile() {
  return (
    <div className="card shadow-sm p-4">
      <h4 className="fw-bold mb-4">My Profile</h4>
      <div className="d-flex align-items-center gap-4 mb-4">
        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px', fontSize: '2rem'}}>AJ</div>
        <div>
          <h5 className="mb-1">Umesh Yadav</h5>
          <p className="text-muted mb-0">Senior Developer</p>
        </div>
      </div>
      <hr />
      <div className="row g-3">
        <div className="col-md-6">
          <label className="small text-muted">Email</label>
          <p className="fw-bold">umesh.@company.com</p>
        </div>
        <div className="col-md-6">
          <label className="small text-muted">Employee ID</label>
          <p className="fw-bold">EMP-2024-001</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
