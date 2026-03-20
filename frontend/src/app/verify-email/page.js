"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setMessage("Invalid verification link ❌");
      return;
    }

    fetch(`https://task-manager-app-7w3x.onrender.com/api/auth/verify-email?token=${token}`)
      .then(res => res.json())
      .then(data => {
        setMessage(data.message);

        // redirect to login after 2 sec
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      })
      .catch(() => {
        setMessage("Something went wrong ❌");
      });

  }, [searchParams]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>{message}</h2>
    </div>
  );
}