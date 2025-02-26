// "use client";
// import { useState, useEffect, Suspense, useMemo } from "react";
// import { useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { Clock, Share2, Newspaper, TrendingUp } from "lucide-react";

// const SearchResults = () => {
//   const searchParams = useSearchParams();
//   const query = searchParams.get("q");
//   const [results, setResults] = useState([]);
//   const [trendingArticles, setTrendingArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [visibleResults, setVisibleResults] = useState(6); // Show 6 results
//   const [showToast, setShowToast] = useState(false); // State for toast
//   const [selectedSource, setSelectedSource] = useState("all"); // State for selected source

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         setLoading(true);
//         const [searchResponse, trendingResponse] = await Promise.all([
//           fetch(
//             `https://nepali-news-aggregrator-backend.vercel.app/api/v1/search?q=${query}`
//           ),
//           fetch(
//             "https://nepali-news-aggregrator-backend.vercel.app/api/v1/trending"
//           ),
//         ]);

//         const searchData = await searchResponse.text();
//         const trendingData = await trendingResponse.json();

//         if (!searchResponse.ok || !trendingResponse.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const searchJson = JSON.parse(searchData);
//         setResults(searchJson.data || []);
//         setTrendingArticles(trendingData.data || []);
//       } catch (error) {
//         console.error("Error fetching search or trending data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (query) {
//       fetchResults();
//     }
//   }, [query]);

//   // Sort results by publishedTime in descending order (latest first)
//   const sortedResults = useMemo(() => {
//     return results
//       .filter((item) => {
//         return selectedSource === "all" || item.source === selectedSource;
//       })
//       .sort((a, b) => new Date(b.publishedTime) - new Date(a.publishedTime));
//   }, [results, selectedSource]);

//   // Get unique sources for filter
//   const sources = useMemo(() => {
//     return ["all", ...new Set(results.map((item) => item.source))];
//   }, [results]);

//   const handleShare = () => {
//     navigator.clipboard
//       .writeText(window.location.href)
//       .then(() => {
//         setShowToast(true);
//         setTimeout(() => setShowToast(false), 3000);
//       })
//       .catch((err) => console.error("Failed to copy: ", err));
//   };

//   // Load more results
//   const loadMoreResults = () => setVisibleResults((prev) => prev + 6);

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8 bg-white min-h-screen">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3 flex flex-col sm:flex-row items-start sm:items-center gap-2">
//         <Newspaper className="text-red-600 w-6 h-6" />
//         <span>
//           Search Results for "<span className="font-semibold">{query}</span>"
//         </span>
//       </h1>

//       <div className="flex flex-col sm:flex-row gap-3 mb-6">
//         <select
//           className="px-4 py-2 border border-gray-300 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200 ease-in-out"
//           value={selectedSource}
//           onChange={(e) => setSelectedSource(e.target.value)}
//         >
//           {sources.map((source) => (
//             <option key={source} value={source} className="text-gray-800">
//               {source === "all" ? "All Sources" : source}
//             </option>
//           ))}
//         </select>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center min-h-screen">
//           <div className="w-16 h-16 border-t-4 border-red-600 border-solid rounded-full animate-spin"></div>
//         </div>
//       ) : sortedResults.length === 0 ? (
//         <p>No results found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="md:col-span-2 space-y-6">
//             {sortedResults.slice(0, visibleResults).map((item) => (
//               <div
//                 key={item._id}
//                 className="group hover:bg-gray-50 rounded-lg p-4 transition-colors duration-200"
//               >
//                 <div className="flex flex-col sm:flex-row space-x-4">
//                   <div className="w-full sm:w-48 h-32 overflow-hidden">
//                     <img
//                       src={item.articleImage || null}
//                       alt="Article image"
//                       className="object-cover w-full h-full"
//                       onError={(e) =>
//                         (e.target.src =
//                           "https://res.cloudinary.com/dbdyrmfbc/image/upload/v1738399320/qxh5ezn8rcalsj2cwalw.jpg")
//                       }
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <Link href={`/article/${item._id}`}>
//                       <h2 className="text-xl font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
//                         {item.title}
//                       </h2>
//                     </Link>
//                     <p className="text-gray-600 mt-2 line-clamp-2 text-sm">
//                       {item.summary}
//                     </p>
//                     <div className="flex flex-col md:flex-row items-start md:items-center text-sm text-gray-500 mt-2 justify-between">
//                       {/* Left side: Published time */}
//                       <div className="flex items-center mb-2 md:mb-0">
//                         <Clock className="w-4 h-4 mr-2" />
//                         <span>{item.publishedTime}</span>
//                       </div>

//                       {/* Right side: Source and Share */}
//                       <div className="flex items-center gap-4">
//                         <Link href={`/source/${item.source}`}>
//                           <span className="text-xs bg-gray-100 px-2 py-1 rounded">
//                             {item.source}
//                           </span>
//                         </Link>

//                         <button
//                           onClick={handleShare}
//                           className="flex items-center text-gray-500 hover:text-blue-800 transition-colors"
//                         >
//                           <Share2 className="w-4 h-4 mr-1" /> Share
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             {visibleResults < sortedResults.length && (
//               <button
//                 onClick={loadMoreResults}
//                 className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700 transition"
//               >
//                 Load More
//               </button>
//             )}
//           </div>

//           <aside className="md:col-span-1">
//             <div className="bg-gray-50 p-4 rounded-lg sticky top-0">
//               <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
//                 <TrendingUp className="mr-2 text-red-600" /> Trending
//               </h3>
//               <div className="space-y-4">
//                 {trendingArticles.map((article) => (
//                   <Link
//                     key={article._id}
//                     href={`/article/${article._id}`}
//                     className="block group"
//                   >
//                     <div className="border-b pb-3 hover:bg-white p-2 rounded transition-colors duration-200">
//                       <h4 className="text-sm font-semibold text-gray-800 group-hover:text-red-600 line-clamp-2">
//                         {article.title}
//                       </h4>
//                       <div className="flex items-center text-xs text-gray-500 mt-2">
//                         <span className="truncate">{article.source}</span>
//                         {article.tag && article.tag[0] && (
//                           <span className="ml-auto bg-blue-50 text-blue-800 px-2 py-1 rounded-full text-xs truncate max-w-[100px]">
//                             {article.tag[0]}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </aside>
//         </div>
//       )}
//     </div>
//   );
// };

// export default function SearchResultsPage() {
//   return (
//     <Suspense fallback={<div>Loading search results...</div>}>
//       <SearchResults />
//     </Suspense>
//   );
// }

"use client";
import { useState, useEffect, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Clock,
  Share2,
  Newspaper,
  TrendingUp,
  Filter,
  ArrowUp,
} from "lucide-react";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleResults, setVisibleResults] = useState(6);
  const [showToast, setShowToast] = useState(false);
  const [selectedSource, setSelectedSource] = useState("all");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const [searchResponse, trendingResponse] = await Promise.all([
          fetch(
            `https://nepali-news-aggregrator-backend.vercel.app/api/v1/search?q=${query}`
          ),
          fetch(
            "https://nepali-news-aggregrator-backend.vercel.app/api/v1/trending"
          ),
        ]);

        const searchData = await searchResponse.text();
        const trendingData = await trendingResponse.json();

        if (!searchResponse.ok || !trendingResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const searchJson = JSON.parse(searchData);
        setResults(searchJson.data || []);
        setTrendingArticles(trendingData.data || []);
      } catch (error) {
        console.error("Error fetching search or trending data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  // Handle scroll event for "back to top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sort results by publishedTime in descending order (latest first)
  const sortedResults = useMemo(() => {
    return results
      .filter((item) => {
        return selectedSource === "all" || item.source === selectedSource;
      })
      .sort((a, b) => new Date(b.publishedTime) - new Date(a.publishedTime));
  }, [results, selectedSource]);

  // Get unique sources for filter
  const sources = useMemo(() => {
    return ["all", ...new Set(results.map((item) => item.source))];
  }, [results]);

  const handleShare = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/article/${id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  // Load more results
  const loadMoreResults = () => setVisibleResults((prev) => prev + 6);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white min-h-screen">
      {/* Toast notification */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out">
          Link copied to clipboard!
        </div>
      )}

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-all z-40"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}

      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3 flex items-center gap-2">
        <Newspaper className="text-red-600 w-6 h-6" />
        <span>
          Search Results for "<span className="font-semibold">{query}</span>"
        </span>
      </h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-6 items-center">
        <div className="flex items-center">
          <Filter className="text-red-600 w-5 h-5 mr-2" />
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200 ease-in-out cursor-pointer"
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            aria-label="Filter by source"
          >
            {sources.map((source) => (
              <option key={source} value={source} className="text-gray-800">
                {source === "all" ? "All Sources" : source}
              </option>
            ))}
          </select>
        </div>
        <span className="hidden sm:block text-sm text-gray-500">
          {sortedResults.length} results found
        </span>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-16 h-16 border-t-4 border-red-600 border-solid rounded-full animate-spin"></div>
        </div>
      ) : sortedResults.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600">
            No results found for "{query}"
          </p>
          <p className="mt-2 text-gray-500">
            Try a different search term or browse trending articles
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {sortedResults.slice(0, visibleResults).map((item) => (
              <div
                key={item._id}
                className="group bg-white hover:bg-gray-50 rounded-lg p-4 transition-colors duration-200 border border-gray-100 shadow-sm hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-48 h-32 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={item.articleImage || null}
                      alt={item.title}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
                      onError={(e) =>
                        (e.target.src =
                          "https://res.cloudinary.com/dbdyrmfbc/image/upload/v1738399320/qxh5ezn8rcalsj2cwalw.jpg")
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <Link href={`/article/${item._id}`} className="block">
                      <h2 className="text-xl font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
                        {item.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 mt-2 line-clamp-2 text-sm">
                      {item.summary}
                    </p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center text-sm text-gray-500 mt-3 justify-between gap-2">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{item.publishedTime}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Link href={`/source/${item.source}`}>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors">
                            {item.source}
                          </span>
                        </Link>

                        <button
                          onClick={(e) => handleShare(e, item._id)}
                          className="flex items-center text-gray-500 hover:text-blue-600 transition-colors"
                          aria-label="Share article"
                        >
                          <Share2 className="w-4 h-4 mr-1" /> Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {visibleResults < sortedResults.length && (
              <button
                onClick={loadMoreResults}
                className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors font-medium shadow-sm hover:shadow-md"
              >
                Load More Results
              </button>
            )}
          </div>

          <aside className="lg:col-span-1">
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-100 sticky top-4 max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-red-200 scrollbar-track-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center sticky top-0 bg-gray-50 py-2 z-10">
                <TrendingUp className="mr-2 text-red-600" /> Trending Articles
              </h3>
              <div className="space-y-3 overflow-y-auto">
                {trendingArticles.map((article) => (
                  <Link
                    key={article._id}
                    href={`/article/${article._id}`}
                    className="block group"
                  >
                    <div className="border-b border-gray-200 pb-3 hover:bg-white p-3 rounded transition-colors duration-200">
                      <h4 className="text-sm font-semibold text-gray-800 group-hover:text-red-600 line-clamp-2">
                        {article.title}
                      </h4>
                      <div className="flex items-center text-xs text-gray-500 mt-2 justify-between">
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                          {article.source}
                        </span>
                        {article.tag && article.tag[0] && (
                          <span className="bg-blue-50 text-blue-800 px-2 py-1 rounded-full text-xs truncate max-w-[120px]">
                            {article.tag[0]}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default function SearchResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-16 h-16 border-t-4 border-red-600 border-solid rounded-full animate-spin"></div>
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
