"use client";
import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";
import {
  Clock,
  TrendingUp,
  Newspaper,
  ChevronUp,
  Share2,
  Search,
  Filter,
  UserRoundSearch,
} from "lucide-react";
import Toast from "../../components/toast";

export default function CategoryPage() {
  const [articles, setArticles] = useState([]);
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [visibleArticles, setVisibleArticles] = useState(6);
  const [showToast, setShowToast] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSource, setSelectedSource] = useState("all");

  // Memoize filtered articles
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSource =
        selectedSource === "all" || article.source === selectedSource;
      return matchesSearch && matchesSource;
    });
  }, [articles, searchTerm, selectedSource]);

  // Get unique sources for filter
  const sources = useMemo(() => {
    return ["all", ...new Set(articles.map((article) => article.source))];
  }, [articles]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryResponse, trendingResponse] = await Promise.all([
          fetch(
            "https://nepali-news-aggregrator-backend.vercel.app/api/v1/category/investigations"
          ),
          fetch(
            "https://nepali-news-aggregrator-backend.vercel.app/api/v1/articles/trending"
          ),
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

  const handleShare = (e, url = window.location.href) => {
    e.stopPropagation();
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const loadMoreArticles = () => setVisibleArticles((prev) => prev + 6);

  function generateSlug(text) {
    return text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  }

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 bg-white min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-4 sm:mb-0">
          <UserRoundSearch className="text-red-600 w-6 h-6" /> Investigations
          <span className="text-sm font-normal text-gray-500 ml-2">
            {filteredArticles.length} articles
          </span>
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-red-400  transition duration-200 ease-in-out"
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
          >
            {sources.map((source) => (
              <option key={source} value={source} className="text-gray-800">
                {source === "all" ? "All Sources" : source}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {filteredArticles.slice(0, visibleArticles).map((article) => (
            <div
              key={article._id}
              className="group hover:bg-gray-50 rounded-lg p-4 transition-colors duration-200"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-48 h-32 overflow-hidden rounded-lg">
                  <img
                    src={article.articleImage}
                    alt={article.title}
                    className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-200"
                    onError={(e) =>
                      (e.target.src =
                        "https://res.cloudinary.com/dbdyrmfbc/image/upload/v1738399320/qxh5ezn8rcalsj2cwalw.jpg")
                    }
                  />
                </div>
                <div className="flex-1">
                  <Link href={`/article/${article._id}`}>
                    <h2 className="text-xl font-semibold text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 mt-2 line-clamp-2 text-sm">
                    {article.summary}
                  </p>
                  <div className="flex flex-wrap items-center text-sm text-gray-500 mt-2 gap-2 justify-between">
                    <div className="flex items-center whitespace-nowrap">
                      <Clock className="w-4 h-4 mr-2" />
                      <span
                        className="text-xs truncate max-w-[80px] sm:max-w-none"
                        title={article.publishedTime}
                      >
                        {article.publishedTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 ml-auto flex-shrink-0">
                      <Link
                        href={`/source/${generateSlug(article.source)}`}
                        className="text-xs bg-gray-100 px-2 py-1 rounded max-w-[150px] overflow-hidden whitespace-nowrap"
                        title={article.source}
                      >
                        {article.source}
                      </Link>

                      <button
                        onClick={(e) => handleShare(e, article.sourceURL)}
                        className="flex items-center text-gray-500 hover:text-blue-800 transition-colors whitespace-nowrap text-xs"
                      >
                        <Share2 className="w-4 h-4 mr-1" /> Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {visibleArticles < filteredArticles.length && (
            <button
              onClick={loadMoreArticles}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Load More
            </button>
          )}
        </div>

        <aside className="md:col-span-1">
          <div className="bg-gray-50 p-4 rounded-lg md:sticky md:top-8">
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
                    <div className="flex items-center text-xs text-gray-500 mt-2 justify-between">
                      <span
                        className="truncate max-w-[150px]"
                        title={article.source}
                      >
                        {article.source}
                      </span>
                      {article.tag && article.tag[0] && (
                        <span className="ml-2 bg-blue-50 text-blue-800 px-2 py-1 rounded-full text-xs truncate max-w-[100px]">
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

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors"
          aria-label="Scroll to top"
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
