"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa"; // Importing the search icon from react-icons

const NavBarContent = ({ moreOpen, setMoreOpen, moreRef, onSearch }) => {
  const navItems = [
    "Home",
    "Politics",
    "World",
    "National",
    "Sports",
    "Business",
    "Health",
    "Science-Technology",
    "Art-Culture",
  ];

  const moreItems = ["Editorial"];

  return (
    <nav className="flex justify-between items-center px-4 py-2 text-md font-serif">
      <ul className="flex space-x-4 items-center">
        {navItems.map((item) => (
          <li key={item}>
            <Link
              href={`/${item.toLowerCase()}`}
              className="hover:text-gray-600 transition px-2 py-1 rounded hover:bg-gray-200 inline-block"
            >
              {item}
            </Link>
          </li>
        ))}

        {/* More Dropdown */}
        <li className="relative" ref={moreRef}>
          <button
            className="hover:text-gray-600 transition px-2 py-1 rounded hover:bg-gray-200 inline-block"
            onClick={() => setMoreOpen(!moreOpen)}
            aria-expanded={moreOpen}
          >
            More..
          </button>
          {moreOpen && (
            <ul className="absolute left-0 mt-2 bg-white border border-gray-300 shadow-lg rounded-md p-2 w-40 transition-all duration-200 ease-in-out">
              {moreItems.map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="block px-4 py-2 hover:bg-gray-200 rounded-md transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>

      {/* Search Bar and Date Section */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <form onSubmit={onSearch} className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-md pl-10 pr-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            />
            <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </form>

        {/* Date Section */}
        <div className="text-sm font-serif text-gray-800 whitespace-nowrap">
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
          })}
        </div>
      </div>
    </nav>
  );
};

export default function Navbar() {
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);
  const [showScrollNav, setShowScrollNav] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollNav(window.pageYOffset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.elements[0].value;
    console.log("Search query:", query);
    // Implement search functionality here
  };

  return (
    <div>
      {/* Main Header */}
      <header className="w-full bg-gray-100 text-black border-b border-gray-300 shadow-md">
        {/* Title Section */}
        <div className="text-center py-4 border-b border-gray-300">
          <h1 className="text-3xl font-serif">The Samachar</h1>
        </div>

        {/* Navigation Bar */}
        <NavBarContent
          moreOpen={moreOpen}
          setMoreOpen={setMoreOpen}
          moreRef={moreRef}
          onSearch={handleSearch}
        />
      </header>

      {/* Scroll Navigation Bar */}
      {showScrollNav && (
        <div className="w-full bg-gray-100 text-black border-b border-gray-300 shadow-md fixed top-0 z-50">
          <NavBarContent
            moreOpen={moreOpen}
            setMoreOpen={setMoreOpen}
            moreRef={moreRef}
            onSearch={handleSearch}
          />
        </div>
      )}
    </div>
  );
}
