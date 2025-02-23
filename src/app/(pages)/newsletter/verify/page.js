"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const EmailVerifiedPage = () => {
  const [verificationStatus, setVerificationStatus] = useState("verifying"); // States: verifying, success, error
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Extract the token from the URL

  useEffect(() => {
    if (!token) {
      setVerificationStatus("error");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `https://thesamachar.vercel.app/api/v1/newsletter/verify?token=${token}`
        );

        if (!response.ok) {
          throw new Error("Verification failed");
        }

        const data = await response.json();
        if (data.success) {
          setVerificationStatus("success");
        } else {
          setVerificationStatus("error");
        }
      } catch (error) {
        console.error("Error verifying email:", error);
        setVerificationStatus("error");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        {verificationStatus === "verifying" && (
          <>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Verifying Email...
            </h1>
            <p className="text-gray-600">
              Please wait while we verify your email.
            </p>
          </>
        )}
        {verificationStatus === "success" && (
          <>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Email Verified
            </h1>
            <p className="text-gray-600">
              Your email has been successfully verified.
            </p>
          </>
        )}
        {verificationStatus === "error" && (
          <>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Verification Failed
            </h1>
            <p className="text-gray-600">
              The verification link is invalid or has expired. Please try again.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerifiedPage;
