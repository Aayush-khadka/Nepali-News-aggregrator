"use client";
import React, { useState } from "react";
import { Mail, LoaderCircle, AlertCircle, CheckCircle2 } from "lucide-react";

const UnsubscribePage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) validateEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://nepali-news-aggregrator-backend.vercel.app/api/v1/newsletter/unsubscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const rawResponse = await response.text();
      const contentType = response.headers.get("Content-Type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = JSON.parse(rawResponse);
      } else {
        throw new Error("Invalid response from server. Please try again.");
      }

      if (!response.ok) {
        setError(data?.message || "Failed to unsubscribe. Please try again.");
        return;
      }

      setSuccess(true);
    } catch (err) {
      console.error("Unsubscribe error:", err);
      setError(err.message || "Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-white to-red-50 rounded-xl shadow-lg p-8">
          <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-200">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              You've Been Unsubscribed
            </h2>
            <p className="text-gray-600">
              You have successfully unsubscribed from the newsletter. You will
              no longer receive updates.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-white to-red-50 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-gradient-to-br from-red-500 to-red-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-red-200">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                Unsubscribe from Newsletter
              </h2>
              <p className="text-sm text-gray-600">
                Enter your email address to unsubscribe from the newsletter.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-800 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={() => validateEmail(email)}
                  className={`w-full px-4 py-3 text-gray-800 placeholder-gray-400 bg-white rounded-lg border ${
                    emailError
                      ? "border-red-400 focus:ring-red-100"
                      : "border-gray-200 focus:border-red-400 focus:ring-red-100"
                  } outline-none transition-all shadow-sm`}
                />
                {emailError && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {emailError && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {emailError}
                </p>
              )}
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-70 shadow-sm"
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
                  Unsubscribing...
                </>
              ) : (
                "Unsubscribe"
              )}
            </button>
          </form>
        </div>

        <div className="bg-white/50 backdrop-blur-sm px-6 py-3 text-center text-xs text-gray-600">
          By unsubscribing, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
};

export default UnsubscribePage;
