import React, { useState } from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const styles = {
    wrapper: {
      backgroundColor: "#ffffff",
      minHeight: "100vh",
      width: "100%",
      color: "#1e293b",
      margin: "0",
      padding: "0",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      overflowX: "hidden",
    },

    nav: {
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(10px)",
      padding: "15px 8%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid #f1f5f9",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },

    hero: {
      padding: "120px 20px",
      textAlign: "center",
      background: "radial-gradient(circle at top, #f0f9ff 0%, #ffffff 100%)",
      borderBottom: "1px solid #f1f5f9",
    },

    featureSection: {
      padding: "100px 10%",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "40px",
      backgroundColor: "#ffffff",
    },

    card: (id) => ({
      backgroundColor: "#ffffff",
      padding: "50px 40px",
      borderRadius: "24px",
      border: "1px solid #f1f5f9",
      boxShadow:
        hoveredCard === id
          ? "0 20px 40px rgba(0,0,0,0.08)"
          : "0 4px 6px rgba(0,0,0,0.02)",
      textAlign: "left",
      textDecoration: "none",
      color: "inherit",
      display: "block",
      transition: "all 0.3s ease",
      transform: hoveredCard === id ? "translateY(-10px)" : "translateY(0)",
    }),

    ctaSection: {
      padding: "100px 10%",
      display: "flex",
      justifyContent: "center",
      background: "#ffffff",
    },

    ctaBox: {
      background: "linear-gradient(135deg, #0d6efd 0%, #004dc7 100%)",
      color: "white",
      padding: "100px 40px",
      borderRadius: "40px",
      textAlign: "center",
      width: "100%",
      maxWidth: "1200px",
      boxShadow: "0 20px 50px rgba(13, 110, 253, 0.3)",
    },
    ctaButton: {
      backgroundColor: "white",
      color: "#0d6efd",
      padding: "18px 50px",
      borderRadius: "100px",
      textDecoration: "none",
      fontWeight: "800",
      display: "inline-block",
      marginTop: "40px",
      fontSize: "20px",
      transition: "transform 0.2s",
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    },
  };

  return (
    <div style={styles.wrapper}>
      {/* 1. Header */}
      <nav style={styles.nav}>
        {/* Navigation Bar Logo Section */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
          }}
        >
          {/* Icon Box */}
          <div
            style={{
              backgroundColor: "#0d6efd",
              color: "white",
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "900",
              fontSize: "22px",
              boxShadow: "0 4px 15px rgba(13, 110, 253, 0.25)",
              flexShrink: 0, // Taaki icon chhota na ho
            }}
          >
            PL
          </div>

          {/* Brand Name Text */}
          <div
            style={{
              fontSize: "28px",
              fontWeight: "800",
              color: "#0d6efd",
              letterSpacing: "-1.5px",
              display: "flex",
              alignItems: "baseline",
            }}
          >
            ProLeave<span style={{ color: "#305b9c" }}>.</span>
          </div>
        </Link>
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <Link
            to="/admin"
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "#dc3545",
              border: "2px solid #dc3545",
              padding: "10px 20px",
              borderRadius: "100px",
              fontSize: "14px",
            }}
          >
            Admin Log In
          </Link>
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "#0d6efd",
              border: "2px solid #0d6efd",
              padding: "10px 25px",
              borderRadius: "100px",
              fontSize: "14px",
            }}
          >
            Employee Log In
          </Link>
          <Link
            to="/register"
            style={{
              textDecoration: "none",
              backgroundColor: "#0d6efd",
              color: "white",
              padding: "12px 30px",
              borderRadius: "100px",
              fontWeight: "700",
              fontSize: "14px",
              boxShadow: "0 4px 12px rgba(13, 110, 253, 0.2)",
            }}
          >
            Try for Free
          </Link>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <div style={styles.hero}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div
            style={{
              backgroundColor: "#e0f2fe",
              color: "#0369a1",
              padding: "8px 20px",
              borderRadius: "100px",
              display: "inline-block",
              fontWeight: "700",
              fontSize: "13px",
              marginBottom: "30px",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            New: Smart Overlap Detection
          </div>
          <h1
            style={{
              fontSize: "68px",
              fontWeight: "900",
              marginBottom: "25px",
              lineHeight: "1.1",
              letterSpacing: "-2px",
            }}
          >
            The Operating System for <br />
            <span style={{ color: "#0d6efd" }}>Team Availability.</span>
          </h1>
          <p
            style={{
              fontSize: "22px",
              color: "#64748b",
              marginBottom: "50px",
              lineHeight: "1.6",
              maxWidth: "700px",
              margin: "0 auto 50px",
            }}
          >
            Automate your leave management from request to approval. Give your
            team the freedom to plan, and give yourself the data to lead.
          </p>
          <div
            style={{ display: "flex", gap: "20px", justifyContent: "center" }}
          >
            <Link
              to="/register"
              style={{
                backgroundColor: "#0d6efd",
                color: "white",
                padding: "20px 50px",
                borderRadius: "100px",
                fontSize: "18px",
                fontWeight: "800",
                textDecoration: "none",
                boxShadow: "0 15px 30px rgba(13, 110, 253, 0.3)",
              }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Features Section */}
      <div style={styles.featureSection}>
        {[
          {
            id: "fast",
            icon: "⚡",
            title: "Fast Requests",
            desc: "Submit leave in 3 clicks. Automated managers alerts.",
            color: "#0d6efd",
          },
          {
            id: "calendar",
            icon: "📅",
            title: "Team Calendar",
            desc: "Visualize your entire team's availability in real-time.",
            color: "#10b981",
          },
          {
            id: "secure",
            icon: "🔒",
            title: "Secure Access",
            desc: "Enterprise-level data protection and role management.",
            color: "#f43f5e",
          },
        ].map((f) => (
          <Link
            key={f.id}
            to={`/feature/${f.id}`}
            style={styles.card(f.id)}
            onMouseEnter={() => setHoveredCard(f.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={{ fontSize: "48px", marginBottom: "25px" }}>
              {f.icon}
            </div>
            <h3
              style={{
                fontSize: "24px",
                fontWeight: "800",
                marginBottom: "15px",
              }}
            >
              {f.title}
            </h3>
            <p
              style={{
                color: "#64748b",
                fontSize: "16px",
                lineHeight: "1.6",
                marginBottom: "20px",
              }}
            >
              {f.desc}
            </p>
            <div
              style={{
                fontWeight: "700",
                color: f.color,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Learn more <span>→</span>
            </div>
          </Link>
        ))}
      </div>

      {/* 4. CTA Section */}
      <div style={styles.ctaSection}>
        <div style={styles.ctaBox}>
          <h2
            style={{
              fontSize: "48px",
              fontWeight: "900",
              marginBottom: "20px",
              letterSpacing: "-1px",
            }}
          >
            Ready to transform your workplace?
          </h2>
          <p
            style={{
              fontSize: "20px",
              opacity: "0.9",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Join 500+ companies that have ditched spreadsheets for a
            professional leave management experience.
          </p>
          <Link
            to="/register"
            style={styles.ctaButton}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Create Free Account
          </Link>
        </div>
      </div>

      {/* 5. Footer */}
      <footer
        style={{
          padding: "80px 10%",
          borderTop: "1px solid #f1f5f9",
          textAlign: "center",
          background: "#ffffff",
        }}
      >
        <div
          style={{
            fontWeight: "800",
            fontSize: "22px",
            color: "#0d6efd",
            marginBottom: "20px",
          }}
        >
          ProLeave.
        </div>
        <p style={{ color: "#94a3b8", fontSize: "14px" }}>
          Built for modern HR teams. © 2026 ProLeave Management Systems. All
          rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default LandingPage;
