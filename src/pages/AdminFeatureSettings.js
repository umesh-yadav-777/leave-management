import API from "../components/api";
import React, { useState, useEffect } from "react";
// axios ki zaroorat nahi hai kyunki API instance use kar rahe hain

function AdminFeatureSettings() {
  const [settings, setSettings] = useState({
    companyName: "ProLeave Tech",
    annualLeaveLimit: 20,
    sickLeaveLimit: 12,
    enableEmailNotifications: true,
    allowNegativeBalance: false,
  });
  const [loading, setLoading] = useState(true);

  // 1. Fetch Settings from Database on Load
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // FIXED: Hardcoded URL hatakar endpoint ka use kiya
        const response = await API.get("api/leaves/global-settings/");

        // Backend keys ko frontend state se match kar rahe hain
        setSettings({
          companyName: response.data.company_name || "ProLeave Tech",
          annualLeaveLimit: response.data.annual_leaves || 20,
          sickLeaveLimit: response.data.sick_leaves || 12,
          enableEmailNotifications: response.data.notifications ?? true,
          allowNegativeBalance: response.data.allow_zero ?? false,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching settings:", err);
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // 2. Settings save karne ke liye
  const handleSave = async () => {
    try {
      const dataToSend = {
        company_name: settings.companyName,
        annual_leaves: settings.annualLeaveLimit,
        sick_leaves: settings.sickLeaveLimit,
        notifications: settings.enableEmailNotifications,
        allow_zero: settings.allowNegativeBalance, // Variable name fix kiya
      };

      // FIXED: Hardcoded URL hatakar API instance call kiya
      await API.post("api/leaves/global-settings/", dataToSend);

      alert(
        "Settings updated successfully! Now new rules will be applied system-wide.",
      );
    } catch (err) {
      console.error("Save Error:", err);
      alert("Error saving settings. Please check your backend connection.");
    }
  };

  if (loading)
    return (
      <div className="p-5 text-center text-primary fw-bold">
        <div className="spinner-border spinner-border-sm me-2"></div>
        Loading Configurations...
      </div>
    );

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#fcfcfd",
        minHeight: "100vh",
      }}
    >
      <div className="mb-4 text-start">
        <h2 style={{ color: "navy", fontWeight: "800" }}>
          System Configuration
        </h2>
        <p className="text-muted">
          Manage global leave policies and organization settings.
        </p>
      </div>

      <div className="row text-start">
        <div className="col-md-8">
          <div
            className="card border-0 shadow-sm p-4"
            style={{ borderRadius: "20px" }}
          >
            <h5 className="mb-4 text-primary fw-bold">Organization Details</h5>
            <div className="mb-4 text-start">
              <label className="form-label small fw-bold">
                Company Display Name
              </label>
              <input
                type="text"
                className="form-control shadow-none"
                value={settings.companyName}
                onChange={(e) =>
                  setSettings({ ...settings, companyName: e.target.value })
                }
              />
            </div>

            <hr />

            <h5 className="mb-4 text-primary fw-bold">
              Leave Policy (Annual Allocation)
            </h5>
            <div className="row mb-4">
              <div className="col-md-6 text-start">
                <label className="form-label small fw-bold">
                  Annual Leaves
                </label>
                <input
                  type="number"
                  className="form-control shadow-none"
                  value={settings.annualLeaveLimit}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      annualLeaveLimit: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-6 text-start">
                <label className="form-label small fw-bold">Sick Leaves</label>
                <input
                  type="number"
                  className="form-control shadow-none"
                  value={settings.sickLeaveLimit}
                  onChange={(e) =>
                    setSettings({ ...settings, sickLeaveLimit: e.target.value })
                  }
                />
              </div>
            </div>

            <hr />

            <h5 className="mb-4 text-primary fw-bold">System Preferences</h5>
            <div className="form-check form-switch mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="notifToggle"
                checked={settings.enableEmailNotifications}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    enableEmailNotifications: e.target.checked,
                  })
                }
              />
              <label className="form-check-label ms-2" htmlFor="notifToggle">
                Enable Email Notifications for Managers
              </label>
            </div>

            <div className="form-check form-switch mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="zeroToggle"
                checked={settings.allowNegativeBalance}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    allowNegativeBalance: e.target.checked,
                  })
                }
              />
              <label className="form-check-label ms-2" htmlFor="zeroToggle">
                Allow Employees to apply if balance is zero
              </label>
            </div>

            <button
              className="btn btn-primary w-100 py-2 fw-bold"
              onClick={handleSave}
              style={{ borderRadius: "12px" }}
            >
              Save Configuration
            </button>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-4 bg-light rounded-4 border text-start shadow-sm">
            <h6 className="fw-bold text-primary">
              <i className="bi bi-shield-lock-fill me-2"></i>Admin Privacy
            </h6>
            <p className="small text-muted mb-0" style={{ lineHeight: "1.6" }}>
              Only the Super-Admin can change these settings. Any changes made
              here are immediately saved to the database and reflected on every
              employee's dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminFeatureSettings;
