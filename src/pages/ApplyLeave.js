import React, { useState, useEffect } from "react";

function ApplyLeave() {
  const [formData, setFormData] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const [duration, setDuration] = useState(0);

  // --- Duration Calculation Logic ---
  useEffect(() => {
    if (formData.fromDate && formData.toDate) {
      const start = new Date(formData.fromDate);
      const end = new Date(formData.toDate);

      // Difference in milliseconds
      const diffTime = end - start;
      // Convert to days (+1 to include the start day)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      setDuration(diffDays > 0 ? diffDays : 0);
    } else {
      setDuration(0);
    }
  }, [formData.fromDate, formData.toDate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (duration <= 0) {
      alert("Please select valid dates.");
      return;
    }
    console.log("Leave Applied:", { ...formData, duration });
    alert(`Leave Applied for ${duration} days!`);
  };

  return (
    <div className="container-fluid py-4" style={{ minHeight: "90vh" }}>
      <div className="row justify-content-center">
        <div className="col-lg-8">

          {/* Main Form Card */}
          <div className="card shadow border-0 rounded-4 overflow-hidden">
            <div className="bg-primary p-4 text-white">
              <h3 className="fw-bold mb-1">Apply for Leave</h3>
              <p className="mb-0 opacity-75">Please fill in the details below to request a leave.</p>
            </div>

            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleSubmit}>
                <div className="row g-4">

                  {/* Leave Type */}
                  <div className="col-md-12">
                    <label className="form-label fw-bold text-secondary small text-uppercase">Leave Type</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0"><i className="bi bi-tag-fill text-primary"></i></span>
                      <select
                        className="form-select bg-light border-0 py-3"
                        name="leaveType"
                        value={formData.leaveType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="Sick">Sick Leave (Medical)</option>
                        <option value="Casual">Casual Leave</option>
                        <option value="Paid">Paid / Annual Leave</option>
                        <option value="Maternity">Maternity Leave</option>
                      </select>
                    </div>
                  </div>

                  {/* Dates Section */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-secondary small text-uppercase">From Date</label>
                    <input
                      type="date"
                      className="form-control bg-light border-0 py-3"
                      name="fromDate"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold text-secondary small text-uppercase">To Date</label>
                    <input
                      type="date"
                      className="form-control bg-light border-0 py-3"
                      name="toDate"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Real-time Duration Summary */}
                  {duration > 0 && (
                    <div className="col-12 mt-2">
                      <div className="alert alert-primary border-0 rounded-4 d-flex align-items-center mb-0 shadow-sm animate__animated animate__fadeIn">
                        <i className="bi bi-calendar-event fs-3 me-3"></i>
                        <div>
                          <p className="mb-0 fw-bold">Total Duration: {duration} {duration === 1 ? 'Day' : 'Days'}</p>
                          <small>You are requesting leave from {formData.fromDate} to {formData.toDate}</small>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Reason Box */}
                  <div className="col-12">
                    <label className="form-label fw-bold text-secondary small text-uppercase">Reason / Notes</label>
                    <textarea
                      className="form-control bg-light border-0 p-3"
                      rows="4"
                      name="reason"
                      onChange={handleChange}
                      placeholder="Explain your reason for leave..."
                      required
                    ></textarea>
                  </div>

                  {/* Buttons */}
                  <div className="col-12 d-flex gap-3 pt-3">
                    <button type="submit" className="btn btn-primary px-5 py-3 fw-bold rounded-3 shadow flex-grow-1">
                      <i className="bi bi-send-fill me-2"></i> Submit Application
                    </button>
                    <button type="reset" className="btn btn-outline-secondary px-4 py-3 rounded-3" onClick={() => setDuration(0)}>
                      Clear
                    </button>
                  </div>

                </div>
              </form>
            </div>
          </div>

          {/* Guidelines Section */}
          <div className="mt-4 p-3 bg-white rounded-4 shadow-sm border-0 d-flex align-items-center">
             <i className="bi bi-info-circle-fill text-warning fs-4 me-3"></i>
             <small className="text-muted">Tip: Always apply for sick leave at least 2 hours before office time if possible.</small>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ApplyLeave;
