import React, { useState } from 'react';

function AdminFeatureSettings() {
  // 1. Backend Data: Ye data Database se fetch hoga
  const [settings, setSettings] = useState({
    companyName: "ProLeave Tech",
    annualLeaveLimit: 20,
    sickLeaveLimit: 12,
    enableEmailNotifications: true,
    allowNegativeBalance: false
  });

  // 2. Backend Logic: Settings save karne ke liye
  const handleSave = () => {
    // API Call: axios.post('/api/settings', settings)
    alert("Settings updated in Database! Ab pure system mein naye rules apply ho jayenge.");
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#fcfcfd', minHeight: '100vh' }}>
      <div className="mb-4">
        <h2 style={{ color: 'navy', fontWeight: '800' }}>System Configuration</h2>
        <p className="text-muted">Manage global leave policies and organization settings.</p>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '20px' }}>

            {/* Organization Settings */}
            <h5 className="mb-4 text-primary">Organization Details</h5>
            <div className="mb-4">
              <label className="form-label small fw-bold">Company Display Name</label>
              <input
                type="text"
                className="form-control"
                value={settings.companyName}
                onChange={(e) => setSettings({...settings, companyName: e.target.value})}
              />
            </div>

            <hr />

            {/* Leave Policy Settings */}
            <h5 className="mb-4 text-primary">Leave Policy (Annual Allocation)</h5>
            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label small fw-bold">Annual Leaves</label>
                <input
                  type="number"
                  className="form-control"
                  value={settings.annualLeaveLimit}
                  onChange={(e) => setSettings({...settings, annualLeaveLimit: e.target.value})}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">Sick Leaves</label>
                <input
                  type="number"
                  className="form-control"
                  value={settings.sickLeaveLimit}
                  onChange={(e) => setSettings({...settings, sickLeaveLimit: e.target.value})}
                />
              </div>
            </div>

            <hr />

            {/* System Preferences */}
            <h5 className="mb-4 text-primary">System Preferences</h5>
            <div className="form-check form-switch mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                checked={settings.enableEmailNotifications}
                onChange={(e) => setSettings({...settings, enableEmailNotifications: e.target.checked})}
              />
              <label className="form-check-label">Enable Email Notifications for Managers</label>
            </div>

            <div className="form-check form-switch mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                checked={settings.allowNegativeBalance}
                onChange={(e) => setSettings({...settings, allowNegativeBalance: e.target.checked})}
              />
              <label className="form-check-label">Allow Employees to apply if balance is zero</label>
            </div>

            <button className="btn btn-primary w-100 py-2 fw-bold" onClick={handleSave} style={{ borderRadius: '12px' }}>
              Save Configuration
            </button>
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="col-md-4">
          <div className="p-4 bg-light rounded-4 border">
            <h6><i className="bi bi-shield-lock"></i> Admin Privacy</h6>
            <p className="small text-muted">Ye settings sirf Super-Admin hi change kar sakta hai. Yahan kiya gaya koi bhi badlav turant database mein save hota hai aur har employee ke dashboard par asar dalta hai.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminFeatureSettings;
