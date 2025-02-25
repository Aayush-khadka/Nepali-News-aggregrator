// "use client";
// import React, { useEffect, useState, Suspense } from "react";
// import { useSearchParams } from "next/navigation";
// import { Mail, CheckCircle, XCircle, Loader } from "lucide-react";

// const LoadingState = () => (
//   <div className="flex flex-col items-center justify-center space-y-4">
//     <div className="relative">
//       <Loader className="w-12 h-12 text-red-500 animate-spin" />
//     </div>
//     <div className="space-y-2">
//       <div className="h-2 bg-gray-200 rounded animate-pulse w-32 mx-auto"></div>
//       <div className="h-2 bg-gray-200 rounded animate-pulse w-24 mx-auto"></div>
//     </div>
//   </div>
// );

// const SuccessState = () => (
//   <div className="relative">
//     <div className="transform transition-all duration-500">
//       <div className="bg-green-500 rounded-full p-4">
//         <CheckCircle className="w-12 h-12 text-white" />
//       </div>
//     </div>
//   </div>
// );

// const ErrorState = () => (
//   <div className="relative">
//     <div className="transform transition-all duration-500">
//       <div className="bg-red-500 rounded-full p-4">
//         <XCircle className="w-12 h-12 text-white" />
//       </div>
//     </div>
//   </div>
// );

// const VerificationComponent = () => {
//   const [verificationStatus, setVerificationStatus] = useState("verifying");
//   const [message, setMessage] = useState("");
//   const searchParams = useSearchParams();
//   const token = searchParams.get("token");

//   useEffect(() => {
//     if (!token) {
//       setVerificationStatus("error");
//       setMessage("Verification token is missing.");
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

//   const statusConfig = {
//     verifying: {
//       component: <LoadingState />,
//       title: "Verifying Your Email",
//       titleColor: "text-gray-700",
//       bgColor: "bg-white",
//       borderColor: "border-gray-100",
//     },
//     success: {
//       component: <SuccessState />,
//       title: "Email Verified!",
//       titleColor: "text-red-600",
//       bgColor: "bg-white",
//       borderColor: "border-red-100",
//     },
//     error: {
//       component: <ErrorState />,
//       title: "Verification Failed",
//       titleColor: "text-red-600",
//       bgColor: "bg-white",
//       borderColor: "border-red-100",
//     },
//   };

//   const config = statusConfig[verificationStatus];

//   return (
//     <div className="text-center max-w-md w-full">
//       <div
//         className={`p-8 rounded-xl shadow-lg ${config.bgColor} border ${config.borderColor} transition-all duration-500`}
//       >
//         <div className="flex flex-col items-center space-y-6">
//           {config.component}
//           <h1 className={`text-2xl font-bold ${config.titleColor} mb-2`}>
//             {config.title}
//           </h1>
//           <p className="text-gray-600">{message}</p>
//           {verificationStatus === "success" && (
//             <div className="mt-4 space-y-4">
//               <p className="text-gray-500">
//                 You're all set to receive our latest updates!
//               </p>
//               <a
//                 href="/"
//                 className="inline-block px-6 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-lg transition-all duration-300 shadow-sm"
//               >
//                 Go to Homepage
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const EmailVerifiedPage = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
//       <Suspense fallback={<LoadingState />}>
//         <VerificationComponent />
//       </Suspense>
//     </div>
//   );
// };

// export default EmailVerifiedPage;

"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Mail,
  CheckCircle,
  XCircle,
  Loader,
  Home,
  BookOpen,
} from "lucide-react";

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center space-y-4">
    <div className="relative">
      <Loader className="w-12 h-12 text-red-600 animate-spin" />
    </div>
    <div className="space-y-2">
      <div className="h-2 bg-red-100 rounded animate-pulse w-32 mx-auto"></div>
      <div className="h-2 bg-red-100 rounded animate-pulse w-24 mx-auto"></div>
    </div>
  </div>
);

const SuccessState = () => (
  <div className="relative">
    <div className="transform transition-all duration-500 animate-bounce">
      <div className="bg-red-600 rounded-full p-4">
        <CheckCircle className="w-12 h-12 text-white" />
      </div>
    </div>
  </div>
);

const ErrorState = () => (
  <div className="relative">
    <div className="transform transition-all duration-500">
      <div className="bg-red-600 rounded-full p-4">
        <XCircle className="w-12 h-12 text-white" />
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
      setMessage("Verification token is missing.");
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
      component: <LoadingState />,
      title: "Verifying Your Email",
      titleColor: "text-red-700",
      bgColor: "bg-white",
      borderColor: "border-red-200",
    },
    success: {
      component: <SuccessState />,
      title: "Email Verified!",
      titleColor: "text-red-700",
      bgColor: "bg-white",
      borderColor: "border-red-200",
    },
    error: {
      component: <ErrorState />,
      title: "Verification Failed",
      titleColor: "text-red-700",
      bgColor: "bg-white",
      borderColor: "border-red-200",
    },
  };

  const config = statusConfig[verificationStatus];

  return (
    <div className="text-center max-w-md w-full">
      <div
        className={`p-8 rounded-xl shadow-lg ${config.bgColor} border ${config.borderColor} transition-all duration-500`}
      >
        <div className="flex flex-col items-center space-y-6">
          {config.component}
          <h1 className={`text-2xl font-bold ${config.titleColor} mb-2`}>
            {config.title}
          </h1>
          <p className="text-gray-700">{message}</p>
          {verificationStatus === "success" && (
            <div className="mt-6 space-y-4 w-full">
              <p className="text-gray-700">
                You're all set to receive our latest updates!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                <a
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300 shadow-md w-full sm:w-auto"
                >
                  <Home size={18} />
                  <span>Homepage</span>
                </a>
                <a
                  href="/newsletters"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 shadow-md w-full sm:w-auto"
                >
                  <BookOpen size={18} />
                  <span>Previous Newsletters</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EmailVerifiedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-4">
      <Suspense fallback={<LoadingState />}>
        <VerificationComponent />
      </Suspense>
    </div>
  );
};

export default EmailVerifiedPage;
