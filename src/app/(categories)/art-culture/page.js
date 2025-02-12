"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  Clock,
  User,
  TrendingUp,
  Newspaper,
  ChevronUp,
  Share2,
} from "lucide-react";
import Toast from "../../components/toast";

export default function CategoryPage() {
  const [articles, setArticles] = useState([]);
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [visibleArticles, setVisibleArticles] = useState(6); // Initial articles displayed
  const [showToast, setShowToast] = useState(false);

  // Fetch data and handle scrolling
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryResponse, trendingResponse] = await Promise.all([
          fetch("http://localhost:4000/api/v1/category/art-culture"),
          fetch("http://localhost:4000/api/v1/articles/trending"),
        ]);

        if (!categoryResponse.ok || !trendingResponse.ok)
          throw new Error("Failed to fetch data");

        const categoryData = await categoryResponse.json();
        const trendingData = await trendingResponse.json();

        setArticles(categoryData.data || []);
        setTrendingArticles(trendingData.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Share handler
  const handleShare = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  // Scroll to top
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Load more articles
  const loadMoreArticles = () => setVisibleArticles((prev) => prev + 6);

  // Example Usage
  function generateSlug(text) {
    return text
      .toLowerCase() // Convert to lowercase
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/[^\w-]/g, ""); // Remove non-word characters except hyphens
  }

  // Error and loading states
  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-red-600 border-solid rounded-full animate-spin"></div>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-4 rounded-lg text-red-600">{error}</div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3 flex items-center gap-2">
        <Newspaper className="text-red-600 w-6 h-6" /> Art And Culture
        <span className="text-sm font-normal text-gray-500 ml-auto">
          {articles.length} articles
        </span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {articles.slice(0, visibleArticles).map((article) => (
            <div
              key={article._id}
              className="group hover:bg-gray-50 rounded-lg p-4 transition-colors duration-200"
            >
              <div className="flex space-x-4">
                <div className="w-48 h-32 overflow-hidden">
                  <img
                    src={article.articleImage}
                    alt="Article image"
                    className="object-cover w-full h-full"
                    onError={(e) =>
                      (e.target.src =
                        "https://res.cloudinary.com/dbdyrmfbc/image/upload/v1738399320/qxh5ezn8rcalsj2cwalw.jpg")
                    }
                  />
                </div>
                <div className="flex-1">
                  <Link href={`/article/${article._id}`}>
                    <h2 className="text-xl font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
                      {article.title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 mt-2 line-clamp-2 text-sm">
                    {article.summary}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mt-2 justify-between">
                    {/* Left side: Published time */}
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{article.publishedTime}</span>
                    </div>

                    {/* Right side: Source and Share */}
                    <div className="flex items-center gap-4">
                      <Link href={`/source/${generateSlug(article.source)}`}>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {article.source}
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
          {visibleArticles < articles.length && (
            <button
              onClick={loadMoreArticles}
              className="w-full bg-red-500 text-black py-2 rounded-lg hover:bg-red-700 transition"
            >
              Load More
            </button>
          )}
        </div>

        <aside className="md:col-span-1 relative">
          <div className="bg-gray-50 p-4 rounded-lg absolute top-0">
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

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

      {showToast && (
        <Toast
          message="Link copied to clipboard!"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
