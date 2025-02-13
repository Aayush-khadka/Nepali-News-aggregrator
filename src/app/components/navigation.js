// "use client";

// import { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   Search,
//   Menu,
//   X,
//   Calendar,
//   ChevronRight,
//   ChevronDown,
//   Download,
// } from "lucide-react";

// const NavBarContent = ({ moreOpen, setMoreOpen, moreRef }) => {
//   const router = useRouter();
//   const [query, setQuery] = useState("");
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [deferredPrompt, setDeferredPrompt] = useState(null);
//   const [showInstallPopup, setShowInstallPopup] = useState(false);

//   // PWA Install Logic
//   useEffect(() => {
//     window.addEventListener("beforeinstallprompt", (e) => {
//       e.preventDefault();
//       setDeferredPrompt(e);
//     });
//   }, []);

//   const handleInstallClick = async () => {
//     if (deferredPrompt) {
//       setShowInstallPopup(true);
//     }
//   };

//   const handleInstallConfirm = async () => {
//     if (deferredPrompt) {
//       deferredPrompt.prompt();
//       const { outcome } = await deferredPrompt.userChoice;
//       if (outcome === "accepted") {
//         setDeferredPrompt(null);
//       }
//     }
//     setShowInstallPopup(false);
//   };

//   // Prevent body scroll when mobile menu is open
//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isMobileMenuOpen]);

//   const navItems = [
//     { name: "Politics", path: "/politics" },
//     { name: "World", path: "/world" },
//     { name: "National", path: "/national" },
//     { name: "Sports", path: "/sports" },
//     { name: "Business", path: "/business" },
//     { name: "Health", path: "/health" },
//     { name: "Science & Technology", path: "/science-technology" },
//     { name: "Art & Culture", path: "/art-culture" },
//   ];

//   const moreItems = [
//     { name: "Editorial", path: "/editorial" },
//     // Future items can be added here
//   ];

//   const handleSearchSubmit = (event) => {
//     event.preventDefault();
//     if (query.trim()) {
//       router.push(`/search-results?q=${query.trim()}`);
//       setIsMobileMenuOpen(false);
//     }
//   };

//   return (
//     <nav className="relative px-4 py-2 font-serif bg-white">
//       <div className="flex justify-between items-center max-w-7xl mx-auto">
//         {/* Logo for Mobile */}
//         <div className="lg:hidden flex items-center gap-2">
//           {deferredPrompt && (
//             <button
//               onClick={handleInstallClick}
//               className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-full hover:bg-red-100 transition-colors"
//             >
//               <Download className="w-4 h-4" />
//               <span>Install App</span>
//             </button>
//           )}
//         </div>

//         {/* Desktop Navigation */}
//         <ul className="hidden lg:flex space-x-1 items-center">
//           {navItems.map((item) => (
//             <li key={item.path}>
//               <Link
//                 href={item.path}
//                 className="px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors text-sm font-medium whitespace-nowrap"
//               >
//                 {item.name}
//               </Link>
//             </li>
//           ))}
//           {/* More Dropdown */}
//           <li className="relative" ref={moreRef}>
//             <button
//               className="px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors text-sm font-medium inline-flex items-center gap-1"
//               onClick={() => setMoreOpen(!moreOpen)}
//               aria-expanded={moreOpen}
//             >
//               More
//               <ChevronDown
//                 className={`w-4 h-4 transition-transform duration-200 ${
//                   moreOpen ? "rotate-180" : ""
//                 }`}
//               />
//             </button>
//             {moreOpen && (
//               <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg py-1 w-48 z-50">
//                 {moreItems.map((item) => (
//                   <Link
//                     key={item.path}
//                     href={item.path}
//                     className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 group transition-colors"
//                     onClick={() => setMoreOpen(false)}
//                   >
//                     <span>{item.name}</span>
//                     <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </li>
//         </ul>

//         {/* Search and Date Section */}
//         <div className="flex items-center space-x-4">
//           {/* Search Bar */}
//           <form
//             onSubmit={handleSearchSubmit}
//             className="hidden md:flex items-center"
//           >
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search news..."
//                 className="w-[220px] border border-gray-200 rounded-full pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder:text-gray-400"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//               />
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             </div>
//           </form>

//           {/* Date Display */}
//           <div className="hidden md:flex items-center text-sm text-gray-600 bg-red-50 px-4 py-1.5 rounded-full">
//             <Calendar className="w-4 h-4 mr-2 text-red-600" />
//             <span>
//               {new Date().toLocaleDateString("en-US", {
//                 weekday: "long",
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//               })}
//             </span>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="lg:hidden p-2 hover:bg-red-50 rounded-md text-red-600 transition-colors"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             aria-label="Toggle menu"
//           >
//             {isMobileMenuOpen ? (
//               <X className="h-6 w-6" />
//             ) : (
//               <Menu className="h-6 w-6" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu Overlay */}
//       {isMobileMenuOpen && (
//         <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
//           {/* Mobile Menu Content */}
//           <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-xl">
//             {/* Mobile Menu Header */}
//             <div className="flex items-center justify-between p-4 border-b border-gray-100">
//               <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
//               <button
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="p-2 hover:bg-red-50 rounded-md text-red-600 transition-colors"
//               >
//                 <X className="h-6 w-6" />
//               </button>
//             </div>

//             <div className="h-full overflow-y-auto pb-20">
//               {/* Mobile Search */}
//               <div className="px-4 py-3 border-b border-gray-100">
//                 <form
//                   onSubmit={handleSearchSubmit}
//                   className="flex items-center"
//                 >
//                   <div className="relative w-full">
//                     <input
//                       type="text"
//                       placeholder="Search news..."
//                       className="w-full border border-gray-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
//                       value={query}
//                       onChange={(e) => setQuery(e.target.value)}
//                     />
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                   </div>
//                 </form>
//               </div>

//               {/* Mobile Navigation Items */}
//               <ul className="px-4 py-2">
//                 {[...navItems, ...moreItems].map((item) => (
//                   <li
//                     key={item.path}
//                     className="border-b border-gray-50 last:border-0"
//                   >
//                     <Link
//                       href={item.path}
//                       className="flex items-center justify-between py-3 hover:bg-red-50 px-2 rounded-md group transition-colors"
//                       onClick={() => setIsMobileMenuOpen(false)}
//                     >
//                       <span className="text-gray-700 group-hover:text-red-600">
//                         {item.name}
//                       </span>
//                       <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-600 transform group-hover:translate-x-1 transition-all" />
//                     </Link>
//                   </li>
//                 ))}
//               </ul>

//               {/* Mobile Date Display */}
//               <div className="px-6 py-4 bg-red-50/50 text-sm text-gray-600 flex items-center mt-4">
//                 <Calendar className="w-4 h-4 mr-2 text-red-600" />
//                 <span>
//                   {new Date().toLocaleDateString("en-US", {
//                     weekday: "long",
//                     year: "numeric",
//                     month: "long",
//                     day: "numeric",
//                   })}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default function Navbar() {
//   const [moreOpen, setMoreOpen] = useState(false);
//   const moreRef = useRef(null);
//   const [showScrollNav, setShowScrollNav] = useState(false);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (moreRef.current && !moreRef.current.contains(event.target)) {
//         setMoreOpen(false);
//       }
//     };

//     const handleScroll = () => {
//       setShowScrollNav(window.pageYOffset > 100);
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <div>
//       {/* Main Header */}
//       <header className="w-full bg-white text-black border-b border-gray-200">
//         {/* Title Section */}
//         <div className="text-center py-4 sm:py-6 border-b border-gray-100">
//           <Link
//             href="/"
//             className="text-3xl sm:text-4xl font-serif font-bold hover:text-red-600 transition-colors tracking-tight"
//           >
//             The Samachar
//           </Link>
//         </div>

//         {/* Navigation Bar */}
//         <NavBarContent
//           moreOpen={moreOpen}
//           setMoreOpen={setMoreOpen}
//           moreRef={moreRef}
//         />
//       </header>

//       {/* Scroll Navigation Bar */}
//       {showScrollNav && (
//         <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-md z-50 animate-fade-down">
//           <NavBarContent
//             moreOpen={moreOpen}
//             setMoreOpen={setMoreOpen}
//             moreRef={moreRef}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Menu,
  X,
  Calendar,
  ChevronRight,
  ChevronDown,
  Download,
} from "lucide-react";

const NavBarContent = ({ moreOpen, setMoreOpen, moreRef }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPopup, setShowInstallPopup] = useState(false);

  // PWA Install Logic
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      setShowInstallPopup(true);
    }
  };

  const handleInstallConfirm = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
      }
    }
    setShowInstallPopup(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: "Politics", path: "/politics" },
    { name: "World", path: "/world" },
    { name: "National", path: "/national" },
    { name: "Sports", path: "/sports" },
    { name: "Business", path: "/business" },
    { name: "Health", path: "/health" },
    { name: "Science & Technology", path: "/science-technology" },
    { name: "Art & Culture", path: "/art-culture" },
  ];

  const moreItems = [
    { name: "Editorial", path: "/editorial" },
    // Future items can be added here
  ];

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (query.trim()) {
      router.push(`/search-results?q=${query.trim()}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="relative px-4 py-2 font-serif bg-white">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo and Install Button for Mobile */}
        <div className="lg:hidden flex items-center gap-2">
          {deferredPrompt && (
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-full hover:bg-red-100 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Install App</span>
            </button>
          )}
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex space-x-1 items-center">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className="px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors text-sm font-medium whitespace-nowrap"
              >
                {item.name}
              </Link>
            </li>
          ))}
          {/* More Dropdown */}
          <li className="relative" ref={moreRef}>
            <button
              className="px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors text-sm font-medium inline-flex items-center gap-1"
              onClick={() => setMoreOpen(!moreOpen)}
              aria-expanded={moreOpen}
            >
              More
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  moreOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {moreOpen && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg py-1 w-48 z-50">
                {moreItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 group transition-colors"
                    onClick={() => setMoreOpen(false)}
                  >
                    <span>{item.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
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
                placeholder="Search news..."
                className="w-[220px] border border-gray-200 rounded-full pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder:text-gray-400"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </form>

          {/* Date Display */}
          <div className="hidden md:flex items-center text-sm text-gray-600 bg-red-50 px-4 py-1.5 rounded-full">
            <Calendar className="w-4 h-4 mr-2 text-red-600" />
            <span>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-red-50 rounded-md text-red-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          {/* Mobile Menu Content */}
          <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-xl">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-red-50 rounded-md text-red-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="h-full overflow-y-auto pb-20">
              {/* Mobile Search */}
              <div className="px-4 py-3 border-b border-gray-100">
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center"
                >
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="Search news..."
                      className="w-full border border-gray-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </form>
              </div>

              {/* Mobile Navigation Items */}
              <ul className="px-4 py-2">
                {[...navItems, ...moreItems].map((item) => (
                  <li
                    key={item.path}
                    className="border-b border-gray-50 last:border-0"
                  >
                    <Link
                      href={item.path}
                      className="flex items-center justify-between py-3 hover:bg-red-50 px-2 rounded-md group transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-gray-700 group-hover:text-red-600">
                        {item.name}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-600 transform group-hover:translate-x-1 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Mobile Date Display */}
              <div className="px-6 py-4 bg-red-50/50 text-sm text-gray-600 flex items-center mt-4">
                <Calendar className="w-4 h-4 mr-2 text-red-600" />
                <span>
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Install PWA Popup */}
      {showInstallPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 mx-4 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Install The Samachar
            </h3>
            <p className="text-gray-600 mb-4">
              Install our app on your device for quick access to the latest
              news, even offline!
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowInstallPopup(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleInstallConfirm}
                className="flex-1 px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
              >
                Install
              </button>
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

    const handleScroll = () => {
      setShowScrollNav(window.pageYOffset > 100);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Main Header */}
      <header className="w-full bg-white text-black border-b border-gray-200">
        {/* Title Section */}
        <div className="text-center py-4 sm:py-6 border-b border-gray-100">
          <Link
            href="/"
            className="text-3xl sm:text-4xl font-serif font-bold hover:text-red-600 transition-colors tracking-tight"
          >
            The Samachar
          </Link>
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
        <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-md z-50 animate-fade-down">
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
