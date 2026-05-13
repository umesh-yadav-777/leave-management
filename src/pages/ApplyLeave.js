import React, { useState, useEffect } from "react";
import API from "../components/api";

function ApplyLeave() {
  const [formData, setFormData] = useState({
    leave_type: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (formData.start_date && formData.end_date) {
      const start = new Date(formData.start_date);
      const end = new Date(formData.end_date);
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setDuration(diffDays > 0 ? diffDays : 0);
    } else {
      setDuration(0);
    }
  }, [formData.start_date, formData.end_date]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (duration <= 0) {
      alert("Please select valid dates. End date cannot be before Start date.");
      return;
    }

    setLoading(true);
    try {
      await API.post("api/leaves/apply/", formData);

      alert(`Success: Your leave application has been submitted.`);

      setFormData({ leave_type: "", start_date: "", end_date: "", reason: "" });
      setDuration(0);

    } catch (error) {

      console.error("Backend Error Detail:", error.response?.data);


      const errorDetail = error.response?.data?.error;

      if (errorDetail) {
        alert(`Attention: ${errorDetail}`);
      } else if (error.response?.data) {
        
        alert("Validation Error: Please fill all fields correctly.");
      } else {
        alert("Server Error: Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4" style={{ minHeight: "90vh" }}>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow border-0 rounded-4 overflow-hidden">
            <div className="bg-primary p-4 text-white">
              <h3 className="fw-bold mb-1">Apply for Leave</h3>
              <p className="mb-0 opacity-75">Please fill in the details below to request a leave.</p>
            </div>

            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleSubmit}>
                <div className="row g-4">
                  <div className="col-md-12">
                    <label className="form-label fw-bold text-secondary small text-uppercase">Leave Type</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0"><i className="bi bi-tag-fill text-primary"></i></span>
                      <select
                        className="form-select bg-light border-0 py-3"
                        name="leave_type"
                        value={formData.leave_type}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="Sick">Sick Leave (Medical)</option>
                        <option value="Casual">Casual Leave</option>
                        <option value="Emergency">Emergency Leave</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold text-secondary small text-uppercase">From Date</label>
                    <input
                      type="date"
                      className="form-control bg-light border-0 py-3"
                      name="start_date"
                      value={formData.start_date}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold text-secondary small text-uppercase">To Date</label>
                    <input
                      type="date"
                      className="form-control bg-light border-0 py-3"
                      name="end_date"
                      value={formData.end_date}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {duration > 0 && (
                    <div className="col-12 mt-2">
                      <div className="alert alert-primary border-0 rounded-4 d-flex align-items-center mb-0 shadow-sm">
                        <i className="bi bi-calendar-event fs-3 me-3"></i>
                        <div>
                          <p className="mb-0 fw-bold">Total Duration: {duration} Days</p>
                          <small>Requesting from {formData.start_date} to {formData.end_date}</small>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="col-12">
                    <label className="form-label fw-bold text-secondary small text-uppercase">Reason / Notes</label>
                    <textarea
                      className="form-control bg-light border-0 p-3"
                      rows="4"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      placeholder="Explain your reason..."
                      required
                    ></textarea>
                  </div>

                  <div className="col-12 d-flex gap-3 pt-3">
                    <button type="submit" disabled={loading} className="btn btn-primary px-5 py-3 fw-bold rounded-3 shadow flex-grow-1">
                      <i className="bi bi-send-fill me-2"></i> {loading ? "Submitting..." : "Submit Application"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary px-4 py-3 rounded-3"
                      onClick={() => {
                        setFormData({leave_type:"", start_date:"", end_date:"", reason:""});
                        setDuration(0);
                      }}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyLeave;
