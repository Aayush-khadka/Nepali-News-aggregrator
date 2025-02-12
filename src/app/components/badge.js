// src/components/ui/Badge.js
import React from "react";

const Badge = ({ text, color = "gray", className = "" }) => {
  const badgeColors = {
    gray: "bg-gray-500 text-white",
    red: "bg-red-500 text-white",
    green: "bg-green-500 text-white",
    blue: "bg-blue-500 text-white",
    yellow: "bg-yellow-500 text-white",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${badgeColors[color]} ${className}`}
    >
      {text}
    </span>
  );
};

export default Badge; // Ensure this line exists
