"use client";

import Link from "next/link";

export default function Navbar() {
return (
<div
style={{
width: "100%",
background: "#0f0f0f",
padding: "15px 40px",
borderBottom: "1px solid #222",
display: "flex",
gap: "15px",
alignItems: "center"
}}
>
<Link
href="/"
style={{
background: "#2563eb",
padding: "8px 16px",
borderRadius: "6px",
color: "white",
textDecoration: "none",
fontWeight: "bold"
}}
>
Home </Link>


  <Link
    href="/login"
    style={{
      background: "#2563eb",
      padding: "8px 16px",
      borderRadius: "6px",
      color: "white",
      textDecoration: "none",
      fontWeight: "bold"
    }}
  >
    Login
  </Link>

  <Link
    href="/register"
    style={{
      background: "#2563eb",
      padding: "8px 16px",
      borderRadius: "6px",
      color: "white",
      textDecoration: "none",
      fontWeight: "bold"
    }}
  >
    Register
  </Link>
</div>

);
}