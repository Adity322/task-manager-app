"use client";

import { Suspense } from "react";
import VerifyEmailContent from "./verifyEmailContent";
export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<p style={{ textAlign: "center", marginTop: "100px" }}>Verifying...</p>}>
      <VerifyEmailContent />
    </Suspense>
  );
}