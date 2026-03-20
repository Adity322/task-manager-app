"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setMessage("Invalid verification link ❌");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(
          `https://task-manager-app-7w3x.onrender.com/api/auth/verify-email?token=${token}`
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Verification failed");
        }

        setMessage(data.message || "Email verified successfully ✅");

        // redirect after 2 sec
        setTimeout(() => {
          router.push("/login");
        }, 2000);

      } catch (error) {
        setMessage(error.message || "Something went wrong ❌");
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>{message}</h2>
    </div>
  );
}