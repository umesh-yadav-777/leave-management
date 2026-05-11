import React, { useState, useEffect } from "react";
import API from '../components/api';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('accounts/profile/')
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Profile fetch error", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4">Loading Profile...</div>;
  if (!user) return <div className="p-4">Error loading profile.</div>;

  return (
    <div className="card shadow-sm p-4 border-0" style={{ borderRadius: '15px' }}>
      <h4 className="fw-bold mb-4">My Profile</h4>
      <div className="d-flex align-items-center gap-4 mb-4">
        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm"
             style={{width: '80px', height: '80px', fontSize: '2rem', fontWeight: 'bold'}}>
          {user.initials}
        </div>
        <div>
          <h5 className="mb-1 fw-bold">{user.full_name}</h5>
          <p className="text-muted mb-0">{user.role}</p>
        </div>
      </div>
      <hr className="text-muted opacity-25" />
      <div className="row g-4 mt-2">
        <div className="col-md-6">
          <label className="small text-muted mb-1">Email Address</label>
          <p className="fw-bold text-dark">{user.email}</p>
        </div>
        <div className="col-md-6">
          <label className="small text-muted mb-1">Employee ID</label>
          <p className="fw-bold text-dark">{user.employee_id}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
