"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Create a separate component for the verification logic
const VerificationComponent = () => {
  const [verificationStatus, setVerificationStatus] = useState("verifying");
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setVerificationStatus("error");
      setMessage("Token is missing.");
      return;
    }
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `https://nepali-news-aggregrator-backend.vercel.app/api/v1/newsletter/verify?token=${token}`
        );
        const data = await response.json();
        if (response.ok && data.success) {
          setVerificationStatus("success");
          setMessage(
            data.message || "Your email has been successfully verified."
          );
        } else {
          setVerificationStatus("error");
          setMessage(data.message || "Verification failed.");
        }
      } catch (error) {
        console.error("Error verifying email:", error);
        setVerificationStatus("error");
        setMessage("Failed to verify email. Please try again later.");
      }
    };
    verifyEmail();
  }, [token]);

  return (
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
          <p className="text-gray-600">{message}</p>
        </>
      )}
      {verificationStatus === "error" && (
        <>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Verification Failed
          </h1>
          <p className="text-gray-600">{message}</p>
        </>
      )}
    </div>
  );
};

// Main page component with Suspense
const EmailVerifiedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Suspense
        fallback={
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Loading...
            </h1>
            <p className="text-gray-600">Please wait...</p>
          </div>
        }
      >
        <VerificationComponent />
      </Suspense>
    </div>
  );
};

export default EmailVerifiedPage;
