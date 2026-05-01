import React from "react";

function SystemInfo() {
  const policies = [
    {
      title: "Sick Leave Policy",
      detail: "Medical certificate is mandatory for sick leave exceeding 2 consecutive days.",
      icon: "bi-plus-lg",
      color: "text-danger"
    },
    {
      title: "Casual Leave",
      detail: "Must be applied at least 24 hours in advance for approval.",
      icon: "bi-clock-history",
      color: "text-primary"
    },
    {
      title: "Leave Encashment",
      detail: "Unused paid leaves can be carried forward up to a maximum of 15 days.",
      icon: "bi-cash-stack",
      color: "text-success"
    }
  ];

  return (
    <div className="container-fluid py-4">
      {/* Page Header */}
      <div className="mb-4">
        <h3 className="fw-bold text-dark">System Information & Support</h3>
        <p className="text-muted small">Everything you need to know about the Leave Management System.</p>
      </div>

      <div className="row g-4">
        {/* 1. Leave Policy Section */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-header bg-white border-0 p-4">
              <h5 className="fw-bold mb-0"><i className="bi bi-shield-check me-2 text-primary"></i>Company Leave Policies</h5>
            </div>
            <div className="card-body p-4 pt-0">
              <div className="list-group list-group-flush">
                {policies.map((item, index) => (
                  <div key={index} className="list-group-item border-0 px-0 py-3">
                    <div className="d-flex align-items-start">
                      <div className={`p-2 rounded-3 bg-light ${item.color} me-3`}>
                        <i className={`bi ${item.icon} fs-5`}></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">{item.title}</h6>
                        <p className="text-muted small mb-0">{item.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Application Details */}
          <div className="card shadow-sm border-0 rounded-4 mt-4 bg-light">
            <div className="card-body p-4">
              <h6 className="fw-bold small text-uppercase text-secondary mb-3">Application Version</h6>
              <div className="d-flex align-items-center justify-content-between">
                <span className="text-dark fw-medium">ProLeave Enterprise Edition</span>
                <span className="badge bg-white text-primary border border-primary-subtle px-3 py-2 rounded-pill">v2.0.4 - Stable</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Contact & Support Section */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 rounded-4 bg-primary text-white mb-4">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3">Need Help?</h5>
              <p className="small opacity-75 mb-4">If you face any technical issues or have queries regarding your leave balance, contact us.</p>

              <div className="d-flex align-items-center mb-3">
                <div className="bg-white bg-opacity-25 rounded-circle p-2 me-3">
                  <i className="bi bi-envelope-fill"></i>
                </div>
                <div className="small">
                  <div className="opacity-75">HR Support</div>
                  <div className="fw-bold">hr@company.com</div>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <div className="bg-white bg-opacity-25 rounded-circle p-2 me-3">
                  <i className="bi bi-headset"></i>
                </div>
                <div className="small">
                  <div className="opacity-75">IT Helpdesk</div>
                  <div className="fw-bold">+91 98765 43210</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links / FAQ */}
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-4">
              <h6 className="fw-bold mb-3 small text-uppercase">Quick FAQ</h6>
              <div className="accordion accordion-flush" id="faqAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed px-0 small fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                      How to cancel a leave?
                    </button>
                  </h2>
                  <div id="faq1" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body px-0 py-2 small text-muted">
                      Go to 'My History' and click on the cancel icon if the status is still 'Pending'.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SystemInfo;
