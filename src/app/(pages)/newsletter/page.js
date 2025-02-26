// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Calendar,
//   Filter,
//   ChevronRight,
//   Loader2,
//   BookOpen,
//   Share2,
//   X,
// } from "lucide-react";

// const NewsletterPage = () => {
//   const [newsletters, setNewsletters] = useState([]);
//   const [groupedNewsletters, setGroupedNewsletters] = useState({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
//   const [readingTime, setReadingTime] = useState({});

//   useEffect(() => {
//     const fetchNewsletters = async () => {
//       try {
//         const response = await fetch(
//           "https://nepali-news-aggregrator-backend.vercel.app/api/v1/newsletter/newsletter"
//         );
//         if (!response.ok) throw new Error("Failed to fetch newsletters");
//         const data = await response.json();

//         const grouped = data.data.reduce((acc, newsletter) => {
//           const date = newsletter.date;
//           if (!acc[date]) acc[date] = [];
//           acc[date].push(newsletter);
//           return acc;
//         }, {});

//         const readingTimes = {};
//         data.data.forEach((newsletter) => {
//           const wordCount = newsletter.newsletter.split(/\s+/).length;
//           const timeInMinutes = Math.ceil(wordCount / 200);
//           readingTimes[newsletter._id] = timeInMinutes;
//         });

//         setReadingTime(readingTimes);
//         setGroupedNewsletters(grouped);
//         setNewsletters(data.data);
//         const mostRecentDate = Object.keys(grouped).sort(
//           (a, b) => new Date(b) - new Date(a)
//         )[0];
//         setSelectedDate(mostRecentDate);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchNewsletters();
//   }, []);

//   const categories = [
//     { id: "all", name: "All Categories", icon: "📰", color: "gray" },
//     { id: "national", name: "National", icon: "🇳🇵", color: "orange" },
//     { id: "politics", name: "Politics", icon: "🏛️", color: "gold" },
//     { id: "world", name: "World", icon: "🌍", color: "red" },
//     { id: "sports", name: "Sports", icon: "🏃‍♂️", color: "blue" },
//     { id: "money", name: "Money", icon: "💰", color: "green" },
//     { id: "health", name: "Health", icon: "⚕️", color: "teal" },
//     { id: "valley", name: "Valley", icon: "🏔️", color: "brown" },
//     {
//       id: "science-technology",
//       name: "Science & Technology",
//       icon: "🔬",
//       color: "indigo",
//     },
//     { id: "art-culture", name: "Art & Culture", icon: "🎨", color: "pink" },
//   ];

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const filterNewsletters = (newsletters) => {
//     return newsletters.filter((newsletter) => {
//       const matchesCategory =
//         activeCategory === "all" || newsletter.category === activeCategory;
//       return matchesCategory;
//     });
//   };

//   const handleShare = async (newsletter) => {
//     try {
//       await navigator.share({
//         title: `Newsletter - ${formatDate(newsletter.date)}`,
//         text: newsletter.newsletter.substring(0, 100) + "...",
//         url: window.location.href,
//       });
//     } catch (err) {
//       console.log("Sharing failed:", err);
//     }
//   };

//   const toggleFilterDrawer = () => {
//     setFilterDrawerOpen(!filterDrawerOpen);
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="bg-red-50 p-6 rounded-xl text-red-600 max-w-md mx-4">
//           <h3 className="text-xl font-bold mb-3">Unable to Load Newsletters</h3>
//           <p className="text-red-700">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Mobile Bottom Sheet Trigger */}
//       <div className="lg:hidden fixed bottom-4 right-4 z-50">
//         <button
//           onClick={toggleFilterDrawer}
//           className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors flex items-center justify-center"
//           aria-label="Filter newsletters"
//         >
//           <Filter className="h-6 w-6" />
//         </button>
//       </div>

//       {/* Page Header - Date and Category Pills */}
//       <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-3">
//           <div className="flex flex-col space-y-2">
//             {/* Selected Date Display */}
//             <div className="text-gray-800 font-medium">
//               {selectedDate && formatDate(selectedDate)}
//             </div>

//             {/* Mobile Category Pills Scrollable */}
//             <div className="lg:hidden overflow-x-auto pb-2 -mx-4 px-4">
//               <div className="flex space-x-2 whitespace-nowrap">
//                 {categories.map((category) => (
//                   <button
//                     key={category.id}
//                     onClick={() => setActiveCategory(category.id)}
//                     className={`
//                       px-3 py-1.5 rounded-full text-sm font-medium
//                       transition-colors duration-200
//                       flex items-center gap-1.5
//                       ${
//                         activeCategory === category.id
//                           ? "bg-red-600 text-white"
//                           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                       }
//                     `}
//                   >
//                     <span>{category.icon}</span>
//                     <span>{category.name}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
//         <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
//           {/* Desktop Sidebar */}
//           <aside className="hidden lg:block lg:w-72 flex-shrink-0">
//             <div className="sticky top-24 space-y-6">
//               {/* Archives */}
//               <div className="bg-white rounded-xl p-6 shadow-sm">
//                 <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-gray-900">
//                   <Calendar className="h-5 w-5 text-red-600" />
//                   Archives
//                 </h3>
//                 <div className="space-y-1.5">
//                   {Object.keys(groupedNewsletters)
//                     .sort((a, b) => new Date(b) - new Date(a))
//                     .map((date) => (
//                       <button
//                         key={date}
//                         onClick={() => setSelectedDate(date)}
//                         className={`
//                           w-full px-3 py-2.5 rounded-lg text-left text-base
//                           transition-all duration-200
//                           ${
//                             selectedDate === date
//                               ? "bg-red-50 text-red-600 font-medium ring-1 ring-red-100"
//                               : "hover:bg-gray-50 text-gray-700"
//                           }
//                         `}
//                       >
//                         {formatDate(date)}
//                       </button>
//                     ))}
//                 </div>
//               </div>

//               {/* Categories */}
//               <div className="bg-white rounded-xl p-6 shadow-sm">
//                 <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-gray-900">
//                   <Filter className="h-5 w-5 text-red-600" />
//                   Categories
//                 </h3>
//                 <div className="space-y-1.5">
//                   {categories.map((category) => (
//                     <button
//                       key={category.id}
//                       onClick={() => setActiveCategory(category.id)}
//                       className={`
//                         w-full px-3 py-2.5 rounded-lg text-left flex items-center gap-3
//                         text-base transition-all duration-200
//                         ${
//                           activeCategory === category.id
//                             ? "bg-red-50 text-red-600 font-medium ring-1 ring-red-100"
//                             : "hover:bg-gray-50 text-gray-700"
//                         }
//                       `}
//                     >
//                       <span className="text-lg">{category.icon}</span>
//                       <span>{category.name}</span>
//                       {activeCategory === category.id && (
//                         <ChevronRight className="ml-auto h-4 w-4" />
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </aside>

//           {/* Mobile Filter Bottom Sheet */}
//           <div
//             className={`
//               fixed inset-0 z-50 lg:hidden
//               transform transition-transform duration-300 ease-in-out
//               ${filterDrawerOpen ? "translate-y-0" : "translate-y-full"}
//             `}
//           >
//             {/* Overlay */}
//             <div
//               className="absolute inset-0 bg-black bg-opacity-50"
//               onClick={toggleFilterDrawer}
//               aria-hidden="true"
//             />

//             {/* Bottom Sheet */}
//             <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto">
//               <div className="p-4 border-b border-gray-200 flex items-center justify-between">
//                 <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
//                 <button
//                   onClick={toggleFilterDrawer}
//                   className="p-1.5 rounded-full hover:bg-gray-100"
//                 >
//                   <X className="h-5 w-5 text-gray-600" />
//                 </button>
//               </div>

//               <div className="p-4 space-y-5">
//                 {/* Date Selection */}
//                 <div>
//                   <h4 className="text-base font-medium mb-3 flex items-center gap-2 text-gray-800">
//                     <Calendar className="h-4 w-4 text-red-600" />
//                     Archives
//                   </h4>
//                   <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
//                     {Object.keys(groupedNewsletters)
//                       .sort((a, b) => new Date(b) - new Date(a))
//                       .map((date) => (
//                         <button
//                           key={date}
//                           onClick={() => {
//                             setSelectedDate(date);
//                             toggleFilterDrawer();
//                           }}
//                           className={`
//                             w-full px-3 py-2.5 rounded-lg text-left text-sm
//                             transition-all duration-200
//                             ${
//                               selectedDate === date
//                                 ? "bg-red-50 text-red-600 font-medium ring-1 ring-red-100"
//                                 : "hover:bg-gray-50 text-gray-700"
//                             }
//                           `}
//                         >
//                           {formatDate(date)}
//                         </button>
//                       ))}
//                   </div>
//                 </div>

//                 {/* Categories */}
//                 <div>
//                   <h4 className="text-base font-medium mb-3 flex items-center gap-2 text-gray-800">
//                     <Filter className="h-4 w-4 text-red-600" />
//                     Categories
//                   </h4>
//                   <div className="grid grid-cols-1 gap-2">
//                     {categories.map((category) => (
//                       <button
//                         key={category.id}
//                         onClick={() => {
//                           setActiveCategory(category.id);
//                           toggleFilterDrawer();
//                         }}
//                         className={`
//                           w-full px-3 py-2.5 rounded-lg text-left flex items-center gap-3
//                           text-sm transition-all duration-200
//                           ${
//                             activeCategory === category.id
//                               ? "bg-red-50 text-red-600 font-medium ring-1 ring-red-100"
//                               : "hover:bg-gray-50 text-gray-700"
//                           }
//                         `}
//                       >
//                         <span className="text-lg">{category.icon}</span>
//                         <span>{category.name}</span>
//                         {activeCategory === category.id && (
//                           <ChevronRight className="ml-auto h-4 w-4" />
//                         )}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <main className="flex-1 min-w-0">
//             {selectedDate && groupedNewsletters[selectedDate] && (
//               <div className="space-y-6">
//                 {filterNewsletters(groupedNewsletters[selectedDate]).map(
//                   (newsletter) => (
//                     <article
//                       key={newsletter._id}
//                       className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200"
//                     >
//                       <div className="p-4 sm:p-6">
//                         {/* Card Header */}
//                         <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
//                           <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-red-50 text-red-600">
//                             {
//                               categories.find(
//                                 (c) => c.id === newsletter.category
//                               )?.icon
//                             }
//                             <span className="ml-2 capitalize">
//                               {newsletter.category.replace(/-/g, " ")}
//                             </span>
//                           </span>

//                           <div className="flex items-center gap-2 text-sm text-gray-500">
//                             <div className="flex items-center gap-1">
//                               <BookOpen className="h-4 w-4" />
//                               <span>
//                                 {readingTime[newsletter._id] || 3} min read
//                               </span>
//                             </div>

//                             <button
//                               onClick={() => handleShare(newsletter)}
//                               className="p-1.5 rounded-full hover:bg-gray-100"
//                               aria-label="Share"
//                             >
//                               <Share2 className="h-4 w-4" />
//                             </button>
//                           </div>
//                         </div>

//                         {/* Content */}
//                         <div className="prose prose-sm sm:prose max-w-none">
//                           {newsletter.newsletter
//                             .split("\n\n")
//                             .map((paragraph, idx) => (
//                               <p
//                                 key={idx}
//                                 className="text-gray-700 leading-relaxed mb-4 last:mb-0"
//                               >
//                                 {paragraph.trim()}
//                               </p>
//                             ))}
//                         </div>
//                       </div>
//                     </article>
//                   )
//                 )}
//               </div>
//             )}
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewsletterPage;

// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import {
//   Calendar,
//   Filter,
//   ChevronRight,
//   Loader2,
//   BookOpen,
//   Share2,
//   X,
//   ArrowUp,
//   ChevronLeft,
//   ChevronDown,
// } from "lucide-react";

// const NewsletterPage = () => {
//   const [newsletters, setNewsletters] = useState([]);
//   const [groupedNewsletters, setGroupedNewsletters] = useState({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
//   const [readingTime, setReadingTime] = useState({});
//   const [showScrollToTop, setShowScrollToTop] = useState(false);
//   const [archiveExpanded, setArchiveExpanded] = useState(true);
//   const [categoryExpanded, setCategoryExpanded] = useState(true);

//   const categoriesRef = useRef(null);
//   const mainContentRef = useRef(null);

//   useEffect(() => {
//     const fetchNewsletters = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch(
//           "https://nepali-news-aggregrator-backend.vercel.app/api/v1/newsletter/newsletter"
//         );
//         if (!response.ok) throw new Error("Failed to fetch newsletters");
//         const data = await response.json();

//         const grouped = data.data.reduce((acc, newsletter) => {
//           const date = newsletter.date;
//           if (!acc[date]) acc[date] = [];
//           acc[date].push(newsletter);
//           return acc;
//         }, {});

//         const readingTimes = {};
//         data.data.forEach((newsletter) => {
//           const wordCount = newsletter.newsletter.split(/\s+/).length;
//           const timeInMinutes = Math.ceil(wordCount / 200);
//           readingTimes[newsletter._id] = timeInMinutes;
//         });

//         setReadingTime(readingTimes);
//         setGroupedNewsletters(grouped);
//         setNewsletters(data.data);
//         const mostRecentDate = Object.keys(grouped).sort(
//           (a, b) => new Date(b) - new Date(a)
//         )[0];
//         setSelectedDate(mostRecentDate);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchNewsletters();

//     // Add scroll event listener
//     const handleScroll = () => {
//       const position = window.scrollY;
//       setShowScrollToTop(position > 300);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const categories = [
//     {
//       id: "all",
//       name: "All Categories",
//       icon: "📰",
//       color: "bg-gray-100 text-gray-700",
//     },
//     {
//       id: "national",
//       name: "National",
//       icon: "🇳🇵",
//       color: "bg-orange-100 text-orange-700",
//     },
//     {
//       id: "politics",
//       name: "Politics",
//       icon: "🏛️",
//       color: "bg-yellow-100 text-yellow-700",
//     },
//     {
//       id: "world",
//       name: "World",
//       icon: "🌍",
//       color: "bg-red-100 text-red-700",
//     },
//     {
//       id: "sports",
//       name: "Sports",
//       icon: "🏃‍♂️",
//       color: "bg-blue-100 text-blue-700",
//     },
//     {
//       id: "money",
//       name: "Money",
//       icon: "💰",
//       color: "bg-green-100 text-green-700",
//     },
//     {
//       id: "health",
//       name: "Health",
//       icon: "⚕️",
//       color: "bg-teal-100 text-teal-700",
//     },
//     {
//       id: "valley",
//       name: "Valley",
//       icon: "🏔️",
//       color: "bg-amber-100 text-amber-700",
//     },
//     {
//       id: "science-technology",
//       name: "Science & Technology",
//       icon: "🔬",
//       color: "bg-indigo-100 text-indigo-700",
//     },
//     {
//       id: "art-culture",
//       name: "Art & Culture",
//       icon: "🎨",
//       color: "bg-pink-100 text-pink-700",
//     },
//   ];

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const filterNewsletters = (newsletters) => {
//     return newsletters.filter((newsletter) => {
//       const matchesCategory =
//         activeCategory === "all" || newsletter.category === activeCategory;
//       return matchesCategory;
//     });
//   };

//   const handleShare = async (newsletter) => {
//     try {
//       await navigator.share({
//         title: `Newsletter - ${formatDate(newsletter.date)}`,
//         text: newsletter.newsletter.substring(0, 100) + "...",
//         url: window.location.href,
//       });
//     } catch (err) {
//       console.log("Sharing failed:", err);
//       // Fallback for browsers that don't support navigator.share
//       alert("Copy this link to share: " + window.location.href);
//     }
//   };

//   const toggleFilterDrawer = () => {
//     setFilterDrawerOpen(!filterDrawerOpen);
//   };

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   const handleCategorySelect = (categoryId) => {
//     setActiveCategory(categoryId);
//     if (window.innerWidth < 1024 && mainContentRef.current) {
//       mainContentRef.current.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//     if (filterDrawerOpen) {
//       toggleFilterDrawer();
//     }
//   };

//   const handleDateSelect = (date) => {
//     setSelectedDate(date);
//     if (window.innerWidth < 1024 && mainContentRef.current) {
//       mainContentRef.current.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//     if (filterDrawerOpen) {
//       toggleFilterDrawer();
//     }
//   };

//   const scrollCategoriesRight = () => {
//     if (categoriesRef.current) {
//       categoriesRef.current.scrollBy({ left: 200, behavior: "smooth" });
//     }
//   };

//   const scrollCategoriesLeft = () => {
//     if (categoriesRef.current) {
//       categoriesRef.current.scrollBy({ left: -200, behavior: "smooth" });
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
//         <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
//         <p className="mt-4 text-lg text-gray-600 font-medium">
//           Loading newsletters...
//         </p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="bg-red-50 p-6 rounded-xl text-red-600 max-w-md mx-4 shadow-md">
//           <h3 className="text-xl font-bold mb-3">Unable to Load Newsletters</h3>
//           <p className="text-red-700">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const filteredNewslettersCount =
//     selectedDate && groupedNewsletters[selectedDate]
//       ? filterNewsletters(groupedNewsletters[selectedDate]).length
//       : 0;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Scroll to top button */}
//       {showScrollToTop && (
//         <button
//           onClick={scrollToTop}
//           className="fixed bottom-20 right-4 z-40 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors"
//           aria-label="Scroll to top"
//         >
//           <ArrowUp className="h-5 w-5" />
//         </button>
//       )}

//       {/* Mobile Filter Button */}
//       <div className="lg:hidden fixed bottom-4 right-4 z-50">
//         <button
//           onClick={toggleFilterDrawer}
//           className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors flex items-center justify-center"
//           aria-label="Filter newsletters"
//         >
//           <Filter className="h-6 w-6" />
//         </button>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Desktop Sidebar */}
//           <aside className="hidden lg:block lg:w-64 flex-shrink-0">
//             <div className="sticky top-24 space-y-5">
//               {/* Archives */}
//               <div className="bg-white rounded-xl p-5 shadow-sm">
//                 <button
//                   onClick={() => setArchiveExpanded(!archiveExpanded)}
//                   className="w-full text-base font-semibold mb-3 flex items-center justify-between text-gray-900"
//                 >
//                   <div className="flex items-center gap-2">
//                     <Calendar className="h-4 w-4 text-red-600" />
//                     Archives
//                   </div>
//                   <ChevronDown
//                     className={`h-4 w-4 transition-transform ${
//                       archiveExpanded ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 {archiveExpanded && (
//                   <div className="space-y-1 max-h-60 overflow-y-auto thin-scrollbar pr-1">
//                     {Object.keys(groupedNewsletters)
//                       .sort((a, b) => new Date(b) - new Date(a))
//                       .map((date) => (
//                         <button
//                           key={date}
//                           onClick={() => handleDateSelect(date)}
//                           className={`
//                             w-full px-3 py-2 rounded-lg text-left text-sm
//                             transition-all duration-200
//                             ${
//                               selectedDate === date
//                                 ? "bg-red-50 text-red-600 font-medium"
//                                 : "hover:bg-gray-50 text-gray-700"
//                             }
//                           `}
//                         >
//                           {formatDate(date)}
//                           <span className="ml-2 text-xs text-gray-500">
//                             ({groupedNewsletters[date].length})
//                           </span>
//                         </button>
//                       ))}
//                   </div>
//                 )}
//               </div>

//               {/* Categories */}
//               <div className="bg-white rounded-xl p-5 shadow-sm">
//                 <button
//                   onClick={() => setCategoryExpanded(!categoryExpanded)}
//                   className="w-full text-base font-semibold mb-3 flex items-center justify-between text-gray-900"
//                 >
//                   <div className="flex items-center gap-2">
//                     <Filter className="h-4 w-4 text-red-600" />
//                     Categories
//                   </div>
//                   <ChevronDown
//                     className={`h-4 w-4 transition-transform ${
//                       categoryExpanded ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 {categoryExpanded && (
//                   <div className="space-y-1 max-h-72 overflow-y-auto thin-scrollbar pr-1">
//                     {categories.map((category) => (
//                       <button
//                         key={category.id}
//                         onClick={() => handleCategorySelect(category.id)}
//                         className={`
//                           w-full px-3 py-2 rounded-lg text-left flex items-center gap-2
//                           text-sm transition-all duration-200
//                           ${
//                             activeCategory === category.id
//                               ? "bg-red-50 text-red-600 font-medium"
//                               : "hover:bg-gray-50 text-gray-700"
//                           }
//                         `}
//                       >
//                         <span>{category.icon}</span>
//                         <span>{category.name}</span>
//                         {activeCategory === category.id && (
//                           <ChevronRight className="ml-auto h-3 w-3" />
//                         )}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </aside>

//           {/* Mobile Filter Bottom Sheet */}
//           <div
//             className={`
//               fixed inset-0 z-50 lg:hidden
//               transform transition-transform duration-300 ease-in-out
//               ${filterDrawerOpen ? "translate-y-0" : "translate-y-full"}
//             `}
//           >
//             {/* Overlay */}
//             <div
//               className="absolute inset-0 bg-black bg-opacity-50"
//               onClick={toggleFilterDrawer}
//               aria-hidden="true"
//             />

//             {/* Bottom Sheet */}
//             <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85vh] overflow-hidden">
//               <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
//                 <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
//                 <button
//                   onClick={toggleFilterDrawer}
//                   className="p-1.5 rounded-full hover:bg-gray-100"
//                 >
//                   <X className="h-5 w-5 text-gray-600" />
//                 </button>
//               </div>

//               <div
//                 className="p-4 space-y-5 overflow-y-auto hide-scrollbar"
//                 style={{ maxHeight: "calc(85vh - 60px)" }}
//               >
//                 {/* Date Selection */}
//                 <div>
//                   <h4 className="text-base font-medium mb-3 flex items-center gap-2 text-gray-800">
//                     <Calendar className="h-4 w-4 text-red-600" />
//                     Archives
//                   </h4>
//                   <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto hide-scrollbar pr-1">
//                     {Object.keys(groupedNewsletters)
//                       .sort((a, b) => new Date(b) - new Date(a))
//                       .map((date) => (
//                         <button
//                           key={date}
//                           onClick={() => handleDateSelect(date)}
//                           className={`
//                             w-full px-3 py-2.5 rounded-lg text-left text-sm
//                             transition-all duration-200 flex justify-between items-center
//                             ${
//                               selectedDate === date
//                                 ? "bg-red-50 text-red-600 font-medium"
//                                 : "hover:bg-gray-50 text-gray-700"
//                             }
//                           `}
//                         >
//                           <span>{formatDate(date)}</span>
//                           <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
//                             {groupedNewsletters[date].length}
//                           </span>
//                         </button>
//                       ))}
//                   </div>
//                 </div>

//                 {/* Categories */}
//                 <div>
//                   <h4 className="text-base font-medium mb-3 flex items-center gap-2 text-gray-800">
//                     <Filter className="h-4 w-4 text-red-600" />
//                     Categories
//                   </h4>
//                   <div className="grid grid-cols-1 gap-2 max-h-56 overflow-y-auto hide-scrollbar pr-1">
//                     {categories.map((category) => (
//                       <button
//                         key={category.id}
//                         onClick={() => handleCategorySelect(category.id)}
//                         className={`
//                           w-full px-3 py-2.5 rounded-lg text-left flex items-center gap-3
//                           text-sm transition-all duration-200
//                           ${
//                             activeCategory === category.id
//                               ? "bg-red-50 text-red-600 font-medium"
//                               : "hover:bg-gray-50 text-gray-700"
//                           }
//                         `}
//                       >
//                         <span>{category.icon}</span>
//                         <span>{category.name}</span>
//                         {activeCategory === category.id && (
//                           <ChevronRight className="ml-auto h-4 w-4" />
//                         )}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <main className="flex-1" ref={mainContentRef}>
//             {selectedDate && groupedNewsletters[selectedDate] ? (
//               <>
//                 {filteredNewslettersCount > 0 ? (
//                   <div className="space-y-5">
//                     {filterNewsletters(groupedNewsletters[selectedDate]).map(
//                       (newsletter) => {
//                         const category = categories.find(
//                           (c) => c.id === newsletter.category
//                         );
//                         return (
//                           <article
//                             key={newsletter._id}
//                             className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow transition-all duration-200"
//                           >
//                             <div className="p-5">
//                               {/* Card Header */}
//                               <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
//                                 <span
//                                   className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
//                                     category?.color ||
//                                     "bg-gray-100 text-gray-700"
//                                   }`}
//                                 >
//                                   {category?.icon}
//                                   <span className="ml-1.5 capitalize">
//                                     {newsletter.category.replace(/-/g, " ")}
//                                   </span>
//                                 </span>

//                                 <div className="flex items-center gap-3 text-sm text-gray-500">
//                                   <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
//                                     <BookOpen className="h-3.5 w-3.5" />
//                                     <span>
//                                       {readingTime[newsletter._id] || 3} min
//                                     </span>
//                                   </div>
//                                 </div>
//                               </div>

//                               {/* Content */}
//                               <div className="prose prose-sm sm:prose max-w-none">
//                                 {newsletter.newsletter
//                                   .split("\n\n")
//                                   .map((paragraph, idx) => (
//                                     <p
//                                       key={idx}
//                                       className="text-gray-700 leading-relaxed mb-4 last:mb-0"
//                                     >
//                                       {paragraph.trim()}
//                                     </p>
//                                   ))}
//                               </div>
//                             </div>
//                           </article>
//                         );
//                       }
//                     )}
//                   </div>
//                 ) : (
//                   <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-sm text-center">
//                     <div className="text-5xl mb-4">🔍</div>
//                     <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                       No articles found
//                     </h3>
//                     <p className="text-gray-600 mb-4">
//                       There are no articles in the "
//                       {categories.find((c) => c.id === activeCategory)?.name}"
//                       category for {formatDate(selectedDate)}.
//                     </p>
//                     <button
//                       onClick={() => setActiveCategory("all")}
//                       className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                     >
//                       View All Categories
//                     </button>
//                   </div>
//                 )}
//               </>
//             ) : (
//               <div className="flex items-center justify-center h-40 bg-white rounded-xl shadow-sm">
//                 <p className="text-gray-500">
//                   Select a date to view newsletters
//                 </p>
//               </div>
//             )}
//           </main>
//         </div>
//       </div>

//       {/* CSS for custom scrollbars */}
//       <style jsx global>{`
//         .hide-scrollbar {
//           scrollbar-width: none;
//           -ms-overflow-style: none;
//         }
//         .hide-scrollbar::-webkit-scrollbar {
//           display: none;
//         }

//         .thin-scrollbar::-webkit-scrollbar {
//           width: 3px;
//         }
//         .thin-scrollbar::-webkit-scrollbar-track {
//           background: transparent;
//         }
//         .thin-scrollbar::-webkit-scrollbar-thumb {
//           background: #d1d5db;
//           border-radius: 10px;
//         }
//         .thin-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #ef4444;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default NewsletterPage;

"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Filter,
  ChevronRight,
  Loader2,
  BookOpen,
  X,
  ArrowUp,
  ChevronDown,
} from "lucide-react";

const NewsletterPage = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [groupedNewsletters, setGroupedNewsletters] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedDate, setSelectedDate] = useState(null);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [readingTime, setReadingTime] = useState({});
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [archiveExpanded, setArchiveExpanded] = useState(true);
  const [categoryExpanded, setCategoryExpanded] = useState(true);

  const categoriesRef = useRef(null);
  const mainContentRef = useRef(null);

  // Handle back button for mobile filter drawer
  useEffect(() => {
    const handleBackButton = (e) => {
      if (filterDrawerOpen) {
        e.preventDefault();
        setFilterDrawerOpen(false);
      }
    };

    if (filterDrawerOpen) {
      window.history.pushState(null, "", window.location.pathname);
      window.addEventListener("popstate", handleBackButton);
    }

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [filterDrawerOpen]);

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://nepali-news-aggregrator-backend.vercel.app/api/v1/newsletter/newsletter"
        );
        if (!response.ok) throw new Error("Failed to fetch newsletters");
        const data = await response.json();

        const grouped = data.data.reduce((acc, newsletter) => {
          const date = newsletter.date;
          if (!acc[date]) acc[date] = [];
          acc[date].push(newsletter);
          return acc;
        }, {});

        const readingTimes = {};
        data.data.forEach((newsletter) => {
          const wordCount = newsletter.newsletter.split(/\s+/).length;
          const timeInMinutes = Math.ceil(wordCount / 200);
          readingTimes[newsletter._id] = timeInMinutes;
        });

        setReadingTime(readingTimes);
        setGroupedNewsletters(grouped);
        setNewsletters(data.data);
        const mostRecentDate = Object.keys(grouped).sort(
          (a, b) => new Date(b) - new Date(a)
        )[0];
        setSelectedDate(mostRecentDate);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewsletters();

    // Add scroll event listener
    const handleScroll = () => {
      const position = window.scrollY;
      setShowScrollToTop(position > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    {
      id: "all",
      name: "All Categories",
      icon: "📰",
      color: "bg-gray-100 text-gray-700",
    },
    {
      id: "national",
      name: "National",
      icon: "🇳🇵",
      color: "bg-orange-100 text-orange-700",
    },
    {
      id: "politics",
      name: "Politics",
      icon: "🏛️",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      id: "world",
      name: "World",
      icon: "🌍",
      color: "bg-red-100 text-red-700",
    },
    {
      id: "sports",
      name: "Sports",
      icon: "🏃‍♂️",
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: "money",
      name: "Money",
      icon: "💰",
      color: "bg-green-100 text-green-700",
    },
    {
      id: "health",
      name: "Health",
      icon: "⚕️",
      color: "bg-teal-100 text-teal-700",
    },
    {
      id: "valley",
      name: "Valley",
      icon: "🏔️",
      color: "bg-amber-100 text-amber-700",
    },
    {
      id: "science-technology",
      name: "Science & Technology",
      icon: "🔬",
      color: "bg-indigo-100 text-indigo-700",
    },
    {
      id: "art-culture",
      name: "Art & Culture",
      icon: "🎨",
      color: "bg-pink-100 text-pink-700",
    },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const filterNewsletters = (newsletters) => {
    return newsletters.filter((newsletter) => {
      return activeCategory === "all" || newsletter.category === activeCategory;
    });
  };

  const toggleFilterDrawer = () => {
    if (!filterDrawerOpen) {
      // Add a history entry when opening the drawer
      window.history.pushState(null, "", window.location.pathname);
    }
    setFilterDrawerOpen(!filterDrawerOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCategorySelect = (categoryId) => {
    setActiveCategory(categoryId);
    if (window.innerWidth < 1024 && mainContentRef.current) {
      mainContentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    if (filterDrawerOpen) {
      toggleFilterDrawer();
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    if (window.innerWidth < 1024 && mainContentRef.current) {
      mainContentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    if (filterDrawerOpen) {
      toggleFilterDrawer();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
        <p className="mt-4 text-lg text-gray-600 font-medium">
          Loading newsletters...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-50 p-6 rounded-xl text-red-600 max-w-md mx-4 shadow-md">
          <h3 className="text-xl font-bold mb-3">Unable to Load Newsletters</h3>
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const filteredNewslettersCount =
    selectedDate && groupedNewsletters[selectedDate]
      ? filterNewsletters(groupedNewsletters[selectedDate]).length
      : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Scroll to top button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 z-40 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleFilterDrawer}
          className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors flex items-center justify-center"
          aria-label="Filter newsletters"
        >
          <Filter className="h-6 w-6" />
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-5">
              {/* Archives */}
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <button
                  onClick={() => setArchiveExpanded(!archiveExpanded)}
                  className="w-full text-base font-semibold mb-3 flex items-center justify-between text-gray-900"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-red-600" />
                    Archives
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      archiveExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {archiveExpanded && (
                  <div className="space-y-1 max-h-60 overflow-y-auto thin-scrollbar pr-1">
                    {Object.keys(groupedNewsletters)
                      .sort((a, b) => new Date(b) - new Date(a))
                      .map((date) => (
                        <button
                          key={date}
                          onClick={() => handleDateSelect(date)}
                          className={`
                            w-full px-3 py-2 rounded-lg text-left text-sm
                            transition-all duration-200 
                            ${
                              selectedDate === date
                                ? "bg-red-50 text-red-600 font-medium"
                                : "hover:bg-gray-50 text-gray-700"
                            }
                          `}
                        >
                          {formatDate(date)}
                          <span className="ml-2 text-xs text-gray-500">
                            ({groupedNewsletters[date].length})
                          </span>
                        </button>
                      ))}
                  </div>
                )}
              </div>

              {/* Categories */}
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <button
                  onClick={() => setCategoryExpanded(!categoryExpanded)}
                  className="w-full text-base font-semibold mb-3 flex items-center justify-between text-gray-900"
                >
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-red-600" />
                    Categories
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      categoryExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {categoryExpanded && (
                  <div className="space-y-1 max-h-72 overflow-y-auto thin-scrollbar pr-1">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={`
                          w-full px-3 py-2 rounded-lg text-left flex items-center gap-2
                          text-sm transition-all duration-200 
                          ${
                            activeCategory === category.id
                              ? "bg-red-50 text-red-600 font-medium"
                              : "hover:bg-gray-50 text-gray-700"
                          }
                        `}
                      >
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                        {activeCategory === category.id && (
                          <ChevronRight className="ml-auto h-3 w-3" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Mobile Filter Bottom Sheet */}
          <div
            className={`
              fixed inset-0 z-50 lg:hidden
              transform transition-transform duration-300 ease-in-out
              ${filterDrawerOpen ? "translate-y-0" : "translate-y-full"}
            `}
          >
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={toggleFilterDrawer}
              aria-hidden="true"
            />

            {/* Bottom Sheet */}
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85vh] overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={toggleFilterDrawer}
                  className="p-1.5 rounded-full hover:bg-gray-100"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <div
                className="p-4 space-y-5 overflow-y-auto hide-scrollbar"
                style={{ maxHeight: "calc(85vh - 60px)" }}
              >
                {/* Date Selection */}
                <div>
                  <h4 className="text-base font-medium mb-3 flex items-center gap-2 text-gray-800">
                    <Calendar className="h-4 w-4 text-red-600" />
                    Archives
                  </h4>
                  <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto hide-scrollbar pr-1">
                    {Object.keys(groupedNewsletters)
                      .sort((a, b) => new Date(b) - new Date(a))
                      .map((date) => (
                        <button
                          key={date}
                          onClick={() => handleDateSelect(date)}
                          className={`
                            w-full px-3 py-2.5 rounded-lg text-left text-sm
                            transition-all duration-200 flex justify-between items-center
                            ${
                              selectedDate === date
                                ? "bg-red-50 text-red-600 font-medium"
                                : "hover:bg-gray-50 text-gray-700"
                            }
                          `}
                        >
                          <span>{formatDate(date)}</span>
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                            {groupedNewsletters[date].length}
                          </span>
                        </button>
                      ))}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="text-base font-medium mb-3 flex items-center gap-2 text-gray-800">
                    <Filter className="h-4 w-4 text-red-600" />
                    Categories
                  </h4>
                  <div className="grid grid-cols-1 gap-2 max-h-56 overflow-y-auto hide-scrollbar pr-1">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={`
                          w-full px-3 py-2.5 rounded-lg text-left flex items-center gap-3
                          text-sm transition-all duration-200 
                          ${
                            activeCategory === category.id
                              ? "bg-red-50 text-red-600 font-medium"
                              : "hover:bg-gray-50 text-gray-700"
                          }
                        `}
                      >
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                        {activeCategory === category.id && (
                          <ChevronRight className="ml-auto h-4 w-4" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1" ref={mainContentRef}>
            {selectedDate && groupedNewsletters[selectedDate] ? (
              <>
                {filteredNewslettersCount > 0 ? (
                  <div className="space-y-5">
                    {filterNewsletters(groupedNewsletters[selectedDate]).map(
                      (newsletter) => {
                        const category = categories.find(
                          (c) => c.id === newsletter.category
                        );
                        return (
                          <article
                            key={newsletter._id}
                            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow transition-all duration-200"
                          >
                            <div className="p-5">
                              {/* Card Header */}
                              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                <span
                                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                    category?.color ||
                                    "bg-gray-100 text-gray-700"
                                  }`}
                                >
                                  {category?.icon}
                                  <span className="ml-1.5 capitalize">
                                    {newsletter.category.replace(/-/g, " ")}
                                  </span>
                                </span>

                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                  <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                                    <BookOpen className="h-3.5 w-3.5" />
                                    <span>
                                      {readingTime[newsletter._id] || 3} min
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Content */}
                              <div className="prose prose-sm sm:prose max-w-none">
                                {newsletter.newsletter
                                  .split("\n\n")
                                  .map((paragraph, idx) => (
                                    <p
                                      key={idx}
                                      className="text-gray-700 leading-relaxed mb-4 last:mb-0"
                                    >
                                      {paragraph.trim()}
                                    </p>
                                  ))}
                              </div>
                            </div>
                          </article>
                        );
                      }
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-sm text-center">
                    <div className="text-5xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      No articles found
                    </h3>
                    <p className="text-gray-600 mb-4">
                      There are no articles in the "
                      {categories.find((c) => c.id === activeCategory)?.name}"
                      category for {formatDate(selectedDate)}.
                    </p>
                    <button
                      onClick={() => setActiveCategory("all")}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      View All Categories
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-40 bg-white rounded-xl shadow-sm">
                <p className="text-gray-500">
                  Select a date to view newsletters
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* CSS for custom scrollbars */}
      <style jsx global>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .thin-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .thin-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .thin-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
        .thin-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ef4444;
        }
      `}</style>
    </div>
  );
};

export default NewsletterPage;
