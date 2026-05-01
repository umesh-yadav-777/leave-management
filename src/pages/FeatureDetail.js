import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const detailedFeatures = {
  fast: {
    title: "Fast & Automated Leave Requests",
    icon: "⚡",
    color: "#0d6efd",
    content: {
      what: "The Fast Request system is a high-speed digital interface designed to replace traditional, slow methods of applying for time off. Instead of writing emails or filling out physical forms, employees use a streamlined dashboard to submit requests in seconds.",
      how: "When a user selects dates and submits a request, the system instantly triggers a background process. It checks the user's available leave balance, cross-references company policies, and sends an automated push notification and email to the respective manager. Managers can approve or deny with a single click from their own portal, and the status is updated in real-time.",
      why: "In a fast-paced work environment, waiting days for leave approval can cause stress and project delays. Automation ensures transparency, reduces the administrative burden on HR by 70%, and allows employees to plan their personal lives with certainty. It eliminates human error in leave tracking and ensures that every request is documented and auditable."
    }
  },
  calendar: {
    title: "Smart Team Availability Calendar",
    icon: "📅",
    color: "#198754",
    content: {
      what: "The Smart Calendar is a centralized synchronization tool that provides a bird's-eye view of the entire team's schedule. It aggregates all approved leaves into a single, easy-to-read visual interface.",
      how: "The calendar pulls data from the database every time a leave is approved. It categorizes absences by department and leave type. It also features 'Overlap Detection,' which warns managers if too many critical team members are planning to be away at the same time. It can be filtered by week, month, or specific team clusters.",
      why: "Without a shared calendar, teams often face 'Understaffing Crises' where key projects stall because essential people are missing. This tool is crucial for resource planning. It helps in maintaining high productivity, ensures that deadlines are met by highlighting availability, and fosters a culture of transparency where everyone knows who is available and when."
    }
  },
  secure: {
    title: "Enterprise-Grade Data Security",
    icon: "🔒",
    color: "#dc3545",
    content: {
      what: "Secure Access refers to the multi-layered protection protocols we use to keep company and employee data private. We treat your organizational data with the same level of security used by banking institutions.",
      how: "Data is protected using AES-256 encryption both at rest and in transit. We implement Role-Based Access Control (RBAC), which means a standard employee cannot see another employee's private details, and only top-level admins can access sensitive company-wide reports. The system also logs every action taken, creating a secure audit trail.",
      why: "Employee data, including contact info and leave reasons, is highly sensitive. A data breach can lead to legal issues and loss of trust. Secure access is necessary to comply with global data protection laws (like GDPR), prevent unauthorized internal access, and ensure that your company's internal operations remain strictly confidential and safe from cyber threats."
    }
  }
};

function FeatureDetail() {
  const { id } = useParams();
  const feature = detailedFeatures[id];

  // Page top par scroll karne ke liye
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!feature) {
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>
        <h1>404 - Feature Not Found</h1>
        <Link to="/">Go Back Home</Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Navigation Bar */}
      <nav style={{ backgroundColor: "white", padding: "15px 50px", display: "flex", alignItems: "center", borderBottom: "1px solid #e2e8f0" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#0d6efd", fontWeight: "bold", fontSize: "20px" }}>ProLeave.</Link>
        <span style={{ margin: "0 15px", color: "#cbd5e0" }}>/</span>
        <span style={{ color: "#718096" }}>Features</span>
      </nav>

      {/* Main Content Area */}
      <div style={{ maxWidth: "900px", margin: "50px auto", padding: "0 20px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#718096", fontSize: "14px" }}>← Back to Landing Page</Link>

        <div style={{ backgroundColor: "white", borderRadius: "30px", padding: "60px", marginTop: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "70px", marginBottom: "20px" }}>{feature.icon}</div>
          <h1 style={{ fontSize: "48px", fontWeight: "800", color: "#1a202c", marginBottom: "40px", lineHeight: "1.2" }}>
            {feature.title}
          </h1>

          {/* Section 1: What is it? */}
          <section style={{ marginBottom: "50px" }}>
            <h2 style={{ color: feature.color, fontSize: "24px", fontWeight: "700", marginBottom: "15px" }}>1. What is this feature?</h2>
            <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#4a5568" }}>{feature.content.what}</p>
          </section>

          {/* Section 2: How it works? */}
          <section style={{ marginBottom: "50px" }}>
            <h2 style={{ color: feature.color, fontSize: "24px", fontWeight: "700", marginBottom: "15px" }}>2. How does it work?</h2>
            <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#4a5568" }}>{feature.content.how}</p>
          </section>

          {/* Section 3: Why is it necessary? */}
          <section style={{ marginBottom: "50px" }}>
            <h2 style={{ color: feature.color, fontSize: "24px", fontWeight: "700", marginBottom: "15px" }}>3. Why is it necessary for your business?</h2>
            <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#4a5568" }}>{feature.content.why}</p>
          </section>

          {/* Bottom Action */}
          <div style={{ marginTop: "60px", padding: "40px", backgroundColor: "#f8f9fa", borderRadius: "20px", textAlign: "center" }}>
            <h3 style={{ marginBottom: "20px" }}>Ready to experience {feature.title}?</h3>
            <Link to="/register" style={{ backgroundColor: "#0d6efd", color: "white", padding: "15px 40px", borderRadius: "50px", textDecoration: "none", fontWeight: "bold", display: "inline-block" }}>
              Get Started for Free
            </Link>
          </div>
        </div>
      </div>

      <footer style={{ textAlign: "center", padding: "40px", color: "#a0aec0" }}>
        © 2026 ProLeave Management Systems. All rights reserved.
      </footer>
    </div>
  );
}

export default FeatureDetail;
