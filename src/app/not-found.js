import React from "react";
import Link from "next/link";
import { Home, RefreshCcw, Coffee, ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-white to-red-50">
      <div className="max-w-4xl w-full text-center space-y-8 relative py-12">
        {/* Responsive 404 Animation */}
        <div className="relative transform hover:scale-105 transition-transform duration-300">
          <div className="text-[100px] sm:text-[150px] md:text-[200px] font-black text-red-600/10 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center gap-2 sm:gap-4">
            <div className="text-4xl sm:text-6xl md:text-7xl font-bold text-red-600 animate-bounce">
              4
            </div>
            <div className="relative group">
              <RefreshCcw className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-red-600 animate-spin hover:animate-none transition-all duration-300" />
              <Coffee className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="text-4xl sm:text-6xl md:text-7xl font-bold text-red-600 animate-bounce">
              4
            </div>
          </div>
        </div>

        {/* Responsive Message */}
        <div className="space-y-4 px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 animate-fade-in">
            Oops! Page Not Found
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-lg mx-auto leading-relaxed">
            Looks like this page took a coffee break! Don't worry, our other
            pages are still hard at work. Why not head back home?
          </p>
        </div>

        {/* Responsive Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
          <Link
            href="/"
            className="group flex items-center gap-2 px-6 sm:px-8 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>

        {/* Responsive Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-3 h-3 sm:w-4 sm:h-4 bg-red-200 rounded-full animate-ping opacity-75" />
          <div className="absolute top-1/3 right-1/3 w-2 h-2 sm:w-3 sm:h-3 bg-red-300 rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-4 h-4 sm:w-6 sm:h-6 bg-red-100 rounded-full animate-bounce" />
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 sm:w-4 sm:h-4 bg-red-200 rounded-full animate-float opacity-60" />
          <div className="absolute top-1/2 right-1/2 w-2 h-2 sm:w-3 sm:h-3 bg-red-300 rounded-full animate-pulse delay-150" />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
