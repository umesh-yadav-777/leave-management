import React, { useState } from "react";
import API from '../components/api';

function Settings() {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!newPassword) return alert("Please enter a new password first.");

    setLoading(true);
    try {
      await API.post('accounts/change-password/', { new_password: newPassword });
      alert("Password updated successfully!");
      setNewPassword("");
    } catch (err) {
      alert("Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm p-4 border-0" style={{ borderRadius: '15px' }}>
      <h4 className="fw-bold mb-4">Account Settings</h4>

      <div className="mb-4">
        <h6 className="fw-bold">Notifications</h6>
        <div className="form-check form-switch mt-2">
          <input className="form-check-input" type="checkbox" defaultChecked />
          <label className="form-check-label text-muted">Email notification on leave approval</label>
        </div>
      </div>

      <hr className="text-muted opacity-25" />

      <div className="mb-4 mt-2">
        <h6 className="fw-bold">Security</h6>
        <div className="col-md-6 mt-3">
          <label className="small text-muted mb-1">Change Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
      </div>

      <button
        className="btn btn-primary px-4 rounded-pill"
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}

export default Settings;
