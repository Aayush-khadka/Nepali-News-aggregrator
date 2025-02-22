"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Clock,
  ChevronUp,
  Globe,
  Briefcase,
  Volleyball,
  Share2,
  ExternalLink,
  Eye,
  Calendar,
  NewspaperIcon as Newspaper,
  ChevronRight,
  Earth,
} from "lucide-react";

const Toast = memo(({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg animate-fade-in-up z-50">
      {message}
    </div>
  );
});

const HomePage = () => {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [categoryArticles, setCategoryArticles] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const categoryRefs = useRef({});

  const categories = [
    { name: "Politics", icon: Globe, slug: "politics", color: "red" },
    { name: "World", icon: Earth, slug: "world", color: "red" },
    { name: "Business", icon: Briefcase, slug: "business", color: "red" },
    { name: "National", icon: Newspaper, slug: "national", color: "red" },
    { name: "Sports", icon: Volleyball, slug: "sports", color: "red" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const safeFetch = async (url, type) => {
          const response = await fetch(url);
          if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
          const data = await response.json();
          // Ensure the data is an array or return an empty array
          if (Array.isArray(data)) {
            return data;
          } else if (data.data && Array.isArray(data.data)) {
            return data.data;
          } else if (
            data.data &&
            data.data.results &&
            Array.isArray(data.data.results)
          ) {
            return data.data.results;
          } else {
            console.warn(
              `Warning: ${type} response has unexpected structure:`,
              data
            );
            return [];
          }
        };

        const [featuredData, trendingData, ...categoriesData] =
          await Promise.all([
            safeFetch(
              "https://nepali-news-aggregrator-backend.vercel.app/api/v1/articles/get-latest-articles",
              "featured"
            ),
            safeFetch(
              "https://nepali-news-aggregrator-backend.vercel.app/api/v1/trending",
              "trending"
            ),
            ...categories.map((cat) =>
              safeFetch(
                `https://nepali-news-aggregrator-backend.vercel.app/api/v1/category/${cat.slug}`,
                cat.name
              )
            ),
          ]);

        // Check if featuredData is an array before slicing
        setFeaturedArticles(
          Array.isArray(featuredData) ? featuredData.slice(0, 3) : []
        );
        setTrendingArticles(
          Array.isArray(trendingData) ? trendingData.slice(0, 5) : []
        );

        const categoryArticlesMap = {};
        categories.forEach((cat, index) => {
          categoryArticlesMap[cat.slug] = Array.isArray(categoriesData[index])
            ? categoriesData[index].slice(0, 8)
            : [];
        });
        setCategoryArticles(categoryArticlesMap);
      } catch (err) {
        setError(err.message || "Failed to load content");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleArticleShare = (articleId) => {
    const articleUrl = `${window.location.origin}/article/${articleId}`;
    navigator.clipboard
      .writeText(articleUrl)
      .then(() => {
        setShowToast(true);
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-red-600 border-solid rounded-full animate-spin"></div>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-6 rounded-lg text-red-600 shadow-lg">
          <h3 className="text-xl font-bold mb-2">Error Loading Content</h3>
          <p>{error}</p>
        </div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 min-h-screen">
      {/* Featured Section */}
      <section className="mb-8 sm:mb-16">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-8 flex items-center">
          <span className="bg-gradient-to-r from-red-600 to-red-400 w-2 h-6 sm:h-8 mr-3 sm:mr-4 rounded-full"></span>
          Featured Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {featuredArticles.map((article, index) => (
            <div
              key={article._id}
              className={`relative group ${
                index === 0 ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <div className="relative h-[250px] sm:h-[300px] lg:h-[400px] overflow-hidden rounded-xl shadow-lg transition-all duration-300">
                <img
                  src={article.articleImage}
                  alt={article.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      "https://res.cloudinary.com/dbdyrmfbc/image/upload/v1738399320/qxh5ezn8rcalsj2cwalw.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                  <div className="absolute bottom-0 p-6 w-full">
                    <div className="inline-block px-3 py-1 bg-red-600 text-white rounded-full text-sm font-medium mb-3">
                      {article.category || "Featured"}
                    </div>
                    <Link href={`/article/${article._id}`}>
                      <h2 className="text-white text-xl lg:text-2xl font-bold mb-3 hover:text-red-400 transition-colors line-clamp-2">
                        {article.title}
                      </h2>
                    </Link>
                    {index === 0 && article.description && (
                      <p className="text-gray-200 mb-4 line-clamp-2 text-sm lg:text-base">
                        {article.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-200 text-xs sm:text-sm">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          <span className="truncate max-w-[120px]">
                            {article.publishedTime}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="truncate max-w-[120px]">
                            {article.source}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleArticleShare(article._id);
                          }}
                          className="text-white hover:text-red-400 transition-colors p-2 hover:bg-white/10 rounded-full"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                        <Link
                          href={`/article/${article._id}`}
                          className="text-white hover:text-red-400 transition-colors p-2 hover:bg-white/10 rounded-full"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="mb-8 sm:mb-16 lg:mb-20">
        <div className="flex items-center justify-between mb-4 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
            <TrendingUp className="text-red-600 h-6 w-6 sm:h-8 sm:w-8" />
            Trending Now
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
          {trendingArticles.slice(0, 1).map((article) => (
            <Link
              key={article._id}
              href={`/article/${article._id}`}
              className="lg:col-span-3"
            >
              <div className="group relative h-[300px] sm:h-[400px] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <img
                  src={article.articleImage}
                  alt={article.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      "https://res.cloudinary.com/dbdyrmfbc/image/upload/v1738399320/qxh5ezn8rcalsj2cwalw.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <div className="absolute bottom-0 p-4 sm:p-6 w-full">
                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                      <span className="bg-red-600 text-white text-xl sm:text-2xl font-bold w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
                        1
                      </span>
                      <span className="text-white font-medium px-3 py-1 bg-white/20 rounded-full text-sm">
                        Top Story
                      </span>
                    </div>
                    <h3 className="text-white text-lg sm:text-2xl font-bold mb-3 sm:mb-4 line-clamp-2 group-hover:text-red-400 transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                      <div className="flex items-center text-gray-300 text-sm">
                        <Eye className="w-4 h-4 mr-2" />
                        <span>Trending Now</span>
                      </div>
                      <div className="flex items-center text-gray-300 text-sm">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{article.publishedTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
            {trendingArticles.slice(1, 5).map((article, index) => (
              <Link key={article._id} href={`/article/${article._id}`}>
                <div className="group bg-white rounded-xl hover:bg-gray-50 transition-all duration-300 p-3 sm:p-4 border border-gray-100 hover:border-red-100 hover:shadow-lg">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0">
                      <span className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-100 text-red-600 font-bold text-base sm:text-lg group-hover:bg-red-600 group-hover:text-white transition-colors">
                        {index + 2}
                      </span>
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="text-gray-800 font-semibold text-base sm:text-lg mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                        {article.title}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                        <div className="flex items-center">
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          <span>Trending</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          <span className="truncate">
                            {article.publishedTime}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 self-center">
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-red-600 transform group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category Sections */}
      {categories.map((category) => (
        <section
          key={category.slug}
          className="mb-8 sm:mb-16"
          ref={(categoryRefs.current[category.slug] = React.createRef())}
        >
          <div className="flex items-center justify-between mb-4 sm:mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
              <category.icon
                className={`text-${category.color}-600 h-6 w-6 sm:h-7 sm:w-7`}
              />
              {category.name}
            </h2>
            <Link href={`/${category.slug}`}>
              <span className="text-red-600 hover:text-red-700 font-semibold text-sm sm:text-base group flex items-center gap-1 sm:gap-2">
                View All
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categoryArticles[category.slug]?.map((article) => (
              <div key={article._id} className="group">
                <div className="mb-2 sm:mb-3 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="relative h-40 sm:h-48">
                    <img
                      src={article.articleImage}
                      alt={article.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src =
                          "https://res.cloudinary.com/dbdyrmfbc/image/upload/v1738399320/qxh5ezn8rcalsj2cwalw.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <Link href={`/article/${article._id}`}>
                  <h3 className="font-semibold text-sm sm:text-base text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2 mb-1 sm:mb-2">
                    {article.title}
                  </h3>
                </Link>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  <span className="truncate">{article.publishedTime}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 z-50"
        >
          <ChevronUp className="w-5 h-5" />
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
};

export default HomePage;
