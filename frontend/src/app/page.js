"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div style={styles.container}>

      {/* Navbar */}
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>TaskManager</h2>

        <div>
          <Link href="/login">
            <button style={styles.loginBtn}>Login</button>
          </Link>

          <Link href="/register">
            <button style={styles.registerBtn}>Register</button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>

        <h1 style={styles.heroTitle}>
          Manage Your Tasks <br /> Like a Pro
        </h1>

        <p style={styles.heroText}>
          Stay organized, increase productivity and manage your daily work
          efficiently with our modern Task Manager application.
        </p>

        <Link href="/register">
          <button style={styles.getStarted}>Get Started</button>
        </Link>

      </section>

      {/* Features */}
      <section style={styles.features}>

        <h2 style={styles.featureTitle}>Features</h2>

        <div style={styles.featureGrid}>

          <div style={styles.featureCard}>
            <h3>📝 Task Management</h3>
            <p>Create, update and delete tasks easily.</p>
          </div>

          <div style={styles.featureCard}>
            <h3>🔐 Secure Login</h3>
            <p>JWT based authentication for security.</p>
          </div>

          <div style={styles.featureCard}>
            <h3>⚡ Fast Dashboard</h3>
            <p>Instant task updates with smooth UI.</p>
          </div>

        </div>

      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>©️ 2026 Task Manager App</p>
      </footer>

    </div>
  );
}

const styles = {

  container: {
    fontFamily: "Arial",
    backgroundColor: "#0f172a",
    minHeight: "100vh",
    color: "white"
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 50px",
    alignItems: "center",
    backgroundColor: "#020617"
  },

  logo: {
    color: "#6366f1"
  },

  loginBtn: {
    padding: "8px 18px",
    marginRight: "10px",
    border: "1px solid #6366f1",
    background: "transparent",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer"
  },

  registerBtn: {
    padding: "8px 18px",
    backgroundColor: "#6366f1",
    border: "none",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer"
  },

  hero: {
    textAlign: "center",
    padding: "120px 20px"
  },

  heroTitle: {
    fontSize: "50px",
    marginBottom: "20px"
  },

  heroText: {
    color: "#cbd5f5",
    maxWidth: "600px",
    margin: "auto",
    marginBottom: "30px",
    lineHeight: "1.6"
  },

  getStarted: {
    padding: "14px 30px",
    backgroundColor: "#22c55e",
    border: "none",
    borderRadius: "6px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px"
  },

  features: {
    padding: "80px 20px",
    textAlign: "center"
  },

  featureTitle: {
    fontSize: "32px",
    marginBottom: "40px"
  },

  featureGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap"
  },

  featureCard: {
    backgroundColor: "#1e293b",
    padding: "30px",
    borderRadius: "10px",
    width: "250px",
    boxShadow: "0px 10px 20px rgba(0,0,0,0.5)"
  },

  footer: {
    textAlign: "center",
    padding: "20px",
    borderTop: "1px solid #1e293b",
    marginTop: "50px",
    color: "#94a3b8"
  }

};