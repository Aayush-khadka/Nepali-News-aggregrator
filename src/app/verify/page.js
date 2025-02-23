// "use client";
// import React, { useEffect, useState, Suspense } from "react";
// import { useSearchParams } from "next/navigation";

// // Create a separate component for the verification logic
// const VerificationComponent = () => {
//   const [verificationStatus, setVerificationStatus] = useState("verifying");
//   const [message, setMessage] = useState("");
//   const searchParams = useSearchParams();
//   const token = searchParams.get("token");

//   useEffect(() => {
//     if (!token) {
//       setVerificationStatus("error");
//       setMessage("Token is missing.");
//       return;
//     }
//     const verifyEmail = async () => {
//       try {
//         const response = await fetch(
//           `https://nepali-news-aggregrator-backend.vercel.app/api/v1/newsletter/verify?token=${token}`
//         );
//         const data = await response.json();
//         if (response.ok && data.success) {
//           setVerificationStatus("success");
//           setMessage(
//             data.message || "Your email has been successfully verified."
//           );
//         } else {
//           setVerificationStatus("error");
//           setMessage(data.message || "Verification failed.");
//         }
//       } catch (error) {
//         console.error("Error verifying email:", error);
//         setVerificationStatus("error");
//         setMessage("Failed to verify email. Please try again later.");
//       }
//     };
//     verifyEmail();
//   }, [token]);

//   return (
//     <div className="text-center">
//       {verificationStatus === "verifying" && (
//         <>
//           <h1 className="text-4xl font-bold text-gray-800 mb-4">
//             Verifying Email...
//           </h1>
//           <p className="text-gray-600">
//             Please wait while we verify your email.
//           </p>
//         </>
//       )}
//       {verificationStatus === "success" && (
//         <>
//           <h1 className="text-4xl font-bold text-gray-800 mb-4">
//             Email Verified
//           </h1>
//           <p className="text-gray-600">{message}</p>
//         </>
//       )}
//       {verificationStatus === "error" && (
//         <>
//           <h1 className="text-4xl font-bold text-gray-800 mb-4">
//             Verification Failed
//           </h1>
//           <p className="text-gray-600">{message}</p>
//         </>
//       )}
//     </div>
//   );
// };

// // Main page component with Suspense
// const EmailVerifiedPage = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <Suspense
//         fallback={
//           <div className="text-center">
//             <h1 className="text-4xl font-bold text-gray-800 mb-4">
//               Loading...
//             </h1>
//             <p className="text-gray-600">Please wait...</p>
//           </div>
//         }
//       >
//         <VerificationComponent />
//       </Suspense>
//     </div>
//   );
// };

// export default EmailVerifiedPage;
"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Newspaper, CheckCircle, XCircle, Loader } from "lucide-react";

const LoadingAnimation = () => (
  <div className="flex flex-col items-center space-y-6">
    <div className="relative">
      <Newspaper className="w-16 h-16 text-gray-600 animate-pulse" />
      <div className="absolute -top-1 -right-1">
        <Loader className="w-6 h-6 text-blue-500 animate-spin" />
      </div>
    </div>
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
      </div>
    </div>
  </div>
);

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

  const statusConfig = {
    verifying: {
      icon: <Loader className="w-12 h-12 text-blue-500 animate-spin" />,
      title: "Verifying Your Email...",
      titleColor: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    success: {
      icon: <CheckCircle className="w-12 h-12 text-green-500" />,
      title: "Email Verified Successfully!",
      titleColor: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    error: {
      icon: <XCircle className="w-12 h-12 text-red-500" />,
      title: "Verification Failed",
      titleColor: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
  };

  const config = statusConfig[verificationStatus];

  return (
    <div className="text-center">
      <div
        className={`p-8 rounded-lg shadow-lg ${config.bgColor} border ${config.borderColor}`}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="mb-4">{config.icon}</div>
          <h1 className={`text-2xl font-bold ${config.titleColor} mb-2`}>
            {config.title}
          </h1>
          <div className="relative">
            <Newspaper className="w-16 h-16 text-gray-600" />
          </div>
          <p className="text-gray-600 mt-4">{message}</p>
          {verificationStatus === "success" && (
            <div className="mt-6">
              <p className="text-sm text-gray-500">
                You'll now receive our latest news updates in your inbox.
              </p>
              <a
                href="/"
                className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                Go to Homepage
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EmailVerifiedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Suspense fallback={<LoadingAnimation />}>
        <VerificationComponent />
      </Suspense>
    </div>
  );
};

export default EmailVerifiedPage;
