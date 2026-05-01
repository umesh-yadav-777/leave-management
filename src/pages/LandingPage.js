import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  const styles = {
    wrapper: { backgroundColor: "#fcfcfd", minHeight: "100vh", width: "100%", color: "#1a202c", margin: "0", padding: "0", fontFamily: "'Segoe UI', sans-serif" },
    nav: { backgroundColor: "#ffffff", padding: "15px 50px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 1000 },
    hero: { padding: "100px 20px", textAlign: "center", background: "white" },
    featureSection: { padding: "80px 10%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px" },
    card: { backgroundColor: "#ffffff", padding: "40px", borderRadius: "20px", border: "1px solid #edf2f7", boxShadow: "0 4px 6px rgba(0,0,0,0.02)", textAlign: "center", textDecoration: "none", color: "inherit", display: "block", transition: "transform 0.2s" },

    // Niche wala Blue Section Style
    ctaSection: { padding: "100px 10%", display: "flex", justifyContent: "center" },
    ctaBox: { backgroundColor: "#0d6efd", color: "white", padding: "80px 40px", borderRadius: "30px", textAlign: "center", width: "100%", maxWidth: "1100px" },
    ctaButton: { backgroundColor: "white", color: "#0d6efd", padding: "15px 40px", borderRadius: "50px", textDecoration: "none", fontWeight: "bold", display: "inline-block", marginTop: "30px", fontSize: "18px" }
  };

  return (
    <div style={styles.wrapper}>
      {/* 1. Header */}
      <nav style={styles.nav}>
        <div style={{ fontSize: "28px", fontWeight: "bold", color: "#0d6efd" }}>ProLeave.</div>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Link to="/admin" style={{ textDecoration: "none", fontWeight: "bold", color: "#dc3545", border: "1.5px solid #dc3545", padding: "8px 20px", borderRadius: "50px", fontSize: "14px" }}>Admin Panel</Link>
          <Link to="/login" style={{ textDecoration: "none", fontWeight: "bold", color: "#4a5568" }}>Login</Link>
          <Link to="/register" style={{ textDecoration: "none", backgroundColor: "#0d6efd", color: "white", padding: "10px 25px", borderRadius: "50px", fontWeight: "bold" }}>Get Started</Link>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <div style={styles.hero}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "56px", fontWeight: "800", marginBottom: "20px" }}>The Smart Way to <br /><span style={{ color: "#0d6efd" }}>Manage Team Leave.</span></h1>
          <p style={{ fontSize: "20px", color: "#718096", marginBottom: "40px" }}>Streamline your workforce. Automated requests, instant approvals, and a clear view of your team's availability.</p>
          <Link to="/register" style={{ backgroundColor: "#0d6efd", color: "white", padding: "18px 45px", borderRadius: "50px", fontSize: "18px", fontWeight: "bold", textDecoration: "none" }}>Start Free Trial</Link>
        </div>
      </div>

      {/* 3. Features Section (Clickable) */}
      <div style={styles.featureSection}>
        <Link to="/feature/fast" style={styles.card}>
          <div style={{ fontSize: "40px", color: "#0d6efd", marginBottom: "15px" }}>⚡</div>
          <h3 style={{ fontWeight: "bold" }}>Fast Requests</h3>
          <p style={{ color: "#718096" }}>Apply for leave in seconds with automated notifications. <span style={{color: "#0d6efd"}}>Details →</span></p>
        </Link>

        <Link to="/feature/calendar" style={styles.card}>
          <div style={{ fontSize: "40px", color: "#0d6efd", marginBottom: "15px" }}>📅</div>
          <h3 style={{ fontWeight: "bold" }}>Team Calendar</h3>
          <p style={{ color: "#718096" }}>Sync schedules and see who's away at a glance. <span style={{color: "#0d6efd"}}>Details →</span></p>
        </Link>

        <Link to="/feature/secure" style={styles.card}>
          <div style={{ fontSize: "40px", color: "#0d6efd", marginBottom: "15px" }}>🔒</div>
          <h3 style={{ fontWeight: "bold" }}>Secure Data</h3>
          <p style={{ color: "#718096" }}>Enterprise-grade security for your company data. <span style={{color: "#0d6efd"}}>Details →</span></p>
        </Link>
      </div>

      {/* 4. "Ready to Transform" Blue Section (Restore Kiya Gaya) */}
      <div style={styles.ctaSection}>
        <div style={styles.ctaBox}>
          <h2 style={{ fontSize: "42px", fontWeight: "bold" }}>Ready to transform your workplace?</h2>
          <p style={{ fontSize: "18px", marginTop: "15px", opacity: "0.9" }}>Join hundreds of companies managing time-off the professional way.</p>
          <Link to="/register" style={styles.ctaButton}>Create Your Account</Link>
        </div>
      </div>

      {/* 5. Footer */}
      <footer style={{ padding: "40px", borderTop: "1px solid #e2e8f0", textAlign: "center", background: "white" }}>
        <p style={{ color: "#a0aec0", margin: 0 }}>© 2026 ProLeave Management. Built for Modern Teams.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
