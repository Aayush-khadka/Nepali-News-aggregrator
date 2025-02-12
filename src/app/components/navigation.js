"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { Menu, X } from "lucide-react";

const NavBarContent = ({ moreOpen, setMoreOpen, moreRef }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Politics", path: "/politics" },
    { name: "World", path: "/world" },
    { name: "National", path: "/national" },
    { name: "Sports", path: "/sports" },
    { name: "Business", path: "/business" },
    { name: "Health", path: "/health" },
    { name: "Science & Technology", path: "/science-technology" },
    { name: "Art & Culture", path: "/art-culture" },
  ];

  const moreItems = ["Editorial"];

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (query) {
      router.push(`/search-results?q=${query}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="relative px-4 py-2 font-serif">
      <div className="flex justify-between items-center">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 hover:bg-gray-200 rounded-md"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex space-x-4 items-center">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className="hover:text-gray-600 transition px-2 py-1 rounded hover:bg-gray-200 inline-block text-sm"
              >
                {item.name}
              </Link>
            </li>
          ))}
          {/* More Dropdown - Desktop */}
          <li className="relative" ref={moreRef}>
            <button
              className="hover:text-gray-600 transition px-2 py-1 rounded hover:bg-gray-200 inline-block text-sm"
              onClick={() => setMoreOpen(!moreOpen)}
              aria-expanded={moreOpen}
            >
              More
            </button>
            {moreOpen && (
              <ul className="absolute left-0 mt-2 bg-white border border-gray-300 shadow-lg rounded-md p-2 w-40 z-50">
                {moreItems.map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="block px-4 py-2 hover:bg-gray-200 rounded-md transition text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>

        {/* Search and Date Section */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded-md pl-10 pr-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </form>

          {/* Date - Hide on mobile */}
          <div className="hidden md:block text-sm text-gray-800 whitespace-nowrap">
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "long",
            })}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 pt-16">
          <div className="h-full overflow-y-auto pb-20">
            {/* Mobile Search */}
            <div className="px-4 py-2 border-b border-gray-200">
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
              </form>
            </div>

            {/* Mobile Navigation Items */}
            <ul className="px-4 py-2">
              {navItems.map((item) => (
                <li
                  key={item.path}
                  className="border-b border-gray-100 last:border-0"
                >
                  <Link
                    href={item.path}
                    className="block py-3 hover:bg-gray-50 transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              {moreItems.map((item) => (
                <li
                  key={item}
                  className="border-b border-gray-100 last:border-0"
                >
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="block py-3 hover:bg-gray-50 transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Date */}
            <div className="px-4 py-3 text-sm text-gray-600 border-t border-gray-200 bg-gray-50">
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
              })}
            </div>
          </div>
        </div>
      )}
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

  return (
    <div>
      {/* Main Header */}
      <header className="w-full bg-white text-black border-b border-gray-300 shadow-sm">
        {/* Title Section */}
        <div className="text-center py-4 border-b border-gray-300">
          <h1 className="text-3xl font-serif">The Samachar</h1>
        </div>

        {/* Navigation Bar */}
        <NavBarContent
          moreOpen={moreOpen}
          setMoreOpen={setMoreOpen}
          moreRef={moreRef}
        />
      </header>

      {/* Scroll Navigation Bar */}
      {showScrollNav && (
        <div className="w-full bg-white text-black border-b border-gray-300 shadow-md fixed top-0 z-40">
          <NavBarContent
            moreOpen={moreOpen}
            setMoreOpen={setMoreOpen}
            moreRef={moreRef}
          />
        </div>
      )}
    </div>
  );
}
