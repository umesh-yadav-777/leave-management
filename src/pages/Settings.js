import React from "react";

function Settings() {
  return (
    <div className="card shadow-sm p-4">
      <h4 className="fw-bold mb-4">Account Settings</h4>
      <div className="mb-4">
        <h6>Notifications</h6>
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" defaultChecked />
          <label className="form-check-label">Email notification on leave approval</label>
        </div>
      </div>
      <hr />
      <button className="btn btn-primary">Save Changes</button>
    </div>
  );
}

export default Settings;
