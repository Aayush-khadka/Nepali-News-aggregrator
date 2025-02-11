// components/Toast.js
import React, { useState, useEffect } from "react";

const Toast = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  // Automatically hide toast after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose(); // Call onClose when it's hidden
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gradient-to-r from-red-600 to-red-800 text-white p-4 rounded-lg shadow-xl max-w-xs w-full flex items-center space-x-4 transform transition-all duration-300 ease-in-out opacity-100">
      <div className="flex-1">{message}</div>
      <button
        onClick={() => {
          setVisible(false);
          onClose();
        }}
        className="text-white font-bold text-xl p-1 hover:bg-red-700 rounded-full transition"
      >
        &times;
      </button>
    </div>
  );
};

export default Toast;
