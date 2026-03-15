"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import API from "../../services/api";

export default function Login() {

  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      alert("Login successful");

      router.push("/dashboard");

    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <h2 style={styles.title}>Login</h2>

        <form onSubmit={handleSubmit} style={styles.form}>

          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            onChange={(e)=>setForm({...form,email:e.target.value})}
            required
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            onChange={(e)=>setForm({...form,password:e.target.value})}
            required
          />

          <button style={styles.button} type="submit">
            Login
          </button>

        </form>

        <p style={styles.text}>
          Don't have an account?
          <Link href="/register" style={styles.link}>
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a"
  },

  card: {
    backgroundColor: "#1e293b",
    padding: "40px",
    borderRadius: "10px",
    width: "350px",
    boxShadow: "0px 10px 25px rgba(0,0,0,0.5)"
  },

  title: {
    color: "white",
    textAlign: "center",
    marginBottom: "20px"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #334155",
    backgroundColor: "#0f172a",
    color: "white"
  },

  button: {
    padding: "10px",
    backgroundColor: "#6366f1",
    border: "none",
    borderRadius: "5px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  text: {
    marginTop: "15px",
    textAlign: "center",
    color: "#cbd5f5"
  },

  link: {
    color: "#6366f1",
    textDecoration: "none",
    fontWeight: "bold",
    marginLeft: "5px"
  }
};