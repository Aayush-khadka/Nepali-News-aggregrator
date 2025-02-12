"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Clock, Share2, Newspaper, TrendingUp } from "lucide-react";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleResults, setVisibleResults] = useState(6); // Show 6 results
  const [showToast, setShowToast] = useState(false); // State for toast

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const [searchResponse, trendingResponse] = await Promise.all([
          fetch(
            `https://nepali-news-aggregrator-backend.vercel.app/api/v1/search?q=${query}`
          ),
          fetch(
            "https://nepali-news-aggregrator-backend.vercel.app/api/v1/articles/trending"
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

  // Sort results by publishedTime in descending order (latest first)
  const sortedResults = results.sort(
    (a, b) => new Date(b.publishedTime) - new Date(a.publishedTime)
  );
  function generateSlug(text) {
    return text
      .toLowerCase() // Convert to lowercase
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/[^\w-]/g, ""); // Remove non-word characters except hyphens
  }

  const handleShare = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  // Load more results
  const loadMoreResults = () => setVisibleResults((prev) => prev + 6);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3 flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <Newspaper className="text-red-600 w-6 h-6" />
        <span>
          Search Results for "<span className="font-semibold">{query}</span>"
        </span>
      </h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-16 h-16 border-t-4 border-red-600 border-solid rounded-full animate-spin"></div>
        </div>
      ) : results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {sortedResults.slice(0, visibleResults).map((item) => (
              <div
                key={item._id}
                className="group hover:bg-gray-50 rounded-lg p-4 transition-colors duration-200"
              >
                <div className="flex flex-col sm:flex-row space-x-4">
                  <div className="w-full sm:w-48 h-32 overflow-hidden">
                    <img
                      src={item.articleImage || null}
                      alt="Article image"
                      className="object-cover w-full h-full"
                      onError={(e) =>
                        (e.target.src =
                          "https://res.cloudinary.com/dbdyrmfbc/image/upload/v1738399320/qxh5ezn8rcalsj2cwalw.jpg")
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <Link href={`/article/${item._id}`}>
                      <h2 className="text-xl font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
                        {item.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 mt-2 line-clamp-2 text-sm">
                      {item.summary}
                    </p>
                    <div className="flex flex-col md:flex-row items-start md:items-center text-sm text-gray-500 mt-2 justify-between">
                      {/* Left side: Published time */}
                      <div className="flex items-center mb-2 md:mb-0">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{item.publishedTime}</span>
                      </div>

                      {/* Right side: Source and Share */}
                      <div className="flex items-center gap-4">
                        <Link href={`/source/${generateSlug(item.source)}`}>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {item.source}
                          </span>
                        </Link>

                        <button
                          onClick={handleShare}
                          className="flex items-center text-gray-500 hover:text-blue-800 transition-colors"
                        >
                          <Share2 className="w-4 h-4 mr-1" /> Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {visibleResults < results.length && (
              <button
                onClick={loadMoreResults}
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700 transition"
              >
                Load More
              </button>
            )}
          </div>

          <aside className="md:col-span-1">
            <div className="bg-gray-50 p-4 rounded-lg sticky top-0">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="mr-2 text-red-600" /> Trending
              </h3>
              <div className="space-y-4">
                {trendingArticles.map((article) => (
                  <Link
                    key={article._id}
                    href={`/article/${article._id}`}
                    className="block group"
                  >
                    <div className="border-b pb-3 hover:bg-white p-2 rounded transition-colors duration-200">
                      <h4 className="text-sm font-semibold text-gray-800 group-hover:text-red-600 line-clamp-2">
                        {article.title}
                      </h4>
                      <div className="flex items-center text-xs text-gray-500 mt-2">
                        <span className="truncate">{article.source}</span>
                        <span className="ml-auto bg-blue-50 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {article.tag[0]}
                        </span>
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
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchResults />
    </Suspense>
  );
}
