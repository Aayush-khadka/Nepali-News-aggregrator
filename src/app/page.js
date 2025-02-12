"use client";

import React, { useState, useEffect, useRef } from "react";
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
  NewspaperIcon as Newspaper, // Import the NewspaperIcon
  ChevronRight,
  Palette,
  Atom,
  Earth,
} from "lucide-react";

function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg animate-fade-in-up">
      {message}
    </div>
  );
}

export default function HomePage() {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [categoryArticles, setCategoryArticles] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const categoryRefs = useRef({});

  const categories = [
    { name: "Politics", icon: Globe, slug: "politics", color: "red" },
    { name: "world", icon: Earth, slug: "world", color: "red" },
    { name: "Business", icon: Briefcase, slug: "business", color: "red" },

    { name: "National", icon: Newspaper, slug: "national", color: "red" },
    { name: "Sports", icon: Volleyball, slug: "sports", color: "red" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const safeFetch = async (url, type) => {
          try {
            const response = await fetch(url);
            if (!response.ok)
              throw new Error(`HTTP error! status: ${response.status}`);
            const text = await response.text();
            try {
              const data = JSON.parse(text);
              if (Array.isArray(data)) return data;
              if (data.data) {
                if (Array.isArray(data.data)) return data.data;
                if (data.data.results && Array.isArray(data.data.results))
                  return data.data.results;
              }
              console.warn(
                `Warning: ${type} response has unexpected structure:`,
                data
              );
              return [];
            } catch (parseError) {
              throw new Error(`Invalid JSON in ${type} response`);
            }
          } catch (fetchError) {
            throw new Error(`Failed to fetch ${type}: ${fetchError.message}`);
          }
        };

        const [featuredData, trendingData, ...categoriesData] =
          await Promise.all([
            safeFetch(
              "https://nepali-news-aggregrator-backend.vercel.app/api/v1/articles/get-latest-articles",
              "featured"
            ),
            safeFetch(
              "https://nepali-news-aggregrator-backend.vercel.app/api/v1/articles/trending",
              "trending"
            ),
            ...categories.map((cat) =>
              safeFetch(
                `https://nepali-news-aggregrator-backend.vercel.app/api/v1/category/${cat.slug}`,
                cat.name
              )
            ),
          ]);

        setFeaturedArticles(
          Array.isArray(featuredData) ? featuredData.slice(0, 3) : []
        );
        setTrendingArticles(
          Array.isArray(trendingData) ? trendingData.slice(0, 5) : []
        );

        const categoryArticlesMap = {};
        categories.forEach((cat, index) => {
          categoryArticlesMap[cat.slug] = Array.isArray(categoriesData[index])
            ? categoriesData[index].slice(0, 8) // Show 8 articles per category
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

      // Highlight active category section
      const scrollPosition = window.scrollY + 100;
      let active = null;

      categories.forEach((category) => {
        const element = categoryRefs.current[category.slug]?.current;
        if (element) {
          const bounds = element.getBoundingClientRect();
          if (bounds.top <= 100 && bounds.bottom >= 100) {
            active = category.slug;
          }
        }
      });

      setActiveCategory(active);
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
        setTimeout(() => setShowToast(false), 3000);
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-b-4 border-red-600 border-solid rounded-full animate-spin">
          <div className="w-8 h-8 border-t-4 border-red-400 border-solid rounded-full animate-spin"></div>
        </div>
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
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      {/* Header with Icon */}
      <div className="relative bg-gradient-to-b from-red-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center flex items-center justify-center">
            <div className="flex items-center">
              <Newspaper className="h-12 w-12 text-red-500 mr-4" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-none">
              The Samachar
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your comprehensive source for Nepal Related News in English,
            bringing together stories from the nation's most trusted media
            outlets in one place.
          </p>
        </div>
      </div>

      {/* Featured Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
          <span className="bg-gradient-to-r from-red-600 to-red-400 w-2 h-10 mr-4 rounded-full"></span>
          Featured Stories
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article, index) => (
            <div
              key={article._id}
              className={`relative group ${
                index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <div className="relative h-[400px] overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl">
                <img
                  src={article.articleImage}
                  alt={article.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  onError={(e) =>
                    (e.target.src =
                      "https://res.cloudinary.com/dbdyrmfbc/image/upload/v1738399320/qxh5ezn8rcalsj2cwalw.jpg")
                  }
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity">
                  <div className="absolute bottom-0 p-8 w-full">
                    <div className="inline-block px-4 py-2 bg-red-600 text-white rounded-full text-sm font-medium mb-4 transform group-hover:scale-105 transition-transform">
                      {article.category || "Featured"}
                    </div>

                    <Link href={`/article/${article._id}`}>
                      <h2 className="text-white text-2xl md:text-3xl font-bold mb-4 hover:text-red-400 transition-colors line-clamp-2 group-hover:line-clamp-none">
                        {article.title}
                      </h2>
                    </Link>

                    {index === 0 && article.description && (
                      <p className="text-gray-200 mb-6 line-clamp-2 group-hover:line-clamp-none text-base md:text-lg">
                        {article.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-gray-200 text-sm">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{article.publishedTime}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{article.source}</span>
                        </div>
                      </div>

                      <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleArticleShare(article._id);
                          }}
                          className="text-white hover:text-red-400 transition-colors p-2 hover:bg-white/10 rounded-full"
                        >
                          <Share2 className="w-5 h-5" />
                        </button>
                        <Link
                          href={`/article/${article._id}`}
                          className="text-white hover:text-red-400 transition-colors p-2 hover:bg-white/10 rounded-full"
                        >
                          <ExternalLink className="w-5 h-5" />
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
      <section className="mb-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-4">
            <TrendingUp className="text-red-600 h-8 w-8" />
            Trending Now
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {trendingArticles.map((article, index) => (
            <Link key={article._id} href={`/article/${article._id}`}>
              <div className="group bg-white rounded-2xl p-8 transition-all duration-500 hover:shadow-2xl border border-gray-100 h-full relative overflow-hidden">
                <span className="absolute -top-8 -left-8 text-[120px] font-bold text-gray-50 group-hover:text-red-50 transition-colors z-0">
                  {index + 1}
                </span>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-red-600 transition-colors line-clamp-3 mb-4">
                    {article.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 font-medium">
                    <Eye className="w-4 h-4 mr-2" />
                    <span>Trending</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Category Sections */}
      {categories.map((category) => (
        <section
          key={category.slug}
          className="mb-20"
          ref={(categoryRefs.current[category.slug] = React.createRef())}
        >
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-4">
              <category.icon className={`text-${category.color}-600 h-8 w-8`} />
              {category.name}
            </h2>
            <Link href={`/${category.slug}`}>
              <span className="text-red-600 hover:text-red-700 font-semibold text-lg group flex items-center gap-2">
                View All
                <span className="transform group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {" "}
            {/* Reduced gap */}
            {categoryArticles[category.slug]?.map((article) => (
              <div key={article._id} className="group">
                <div className="mb-4 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                  {" "}
                  {/* Reduced mb */}
                  <div className="relative h-48">
                    {" "}
                    {/* Reduced height */}
                    <img
                      src={article.articleImage}
                      alt={article.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      onError={(e) =>
                        (e.target.src =
                          "https://res.cloudinary.com/dbdyrmfbc/image/upload/v1738399320/qxh5ezn8rcalsj2cwalw.jpg")
                      }
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
                <Link href={`/article/${article._id}`}>
                  <h3 className="font-bold text-lg text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2 mb-2">
                    {" "}
                    {/* Reduced font size and mb */}
                    {article.title}
                  </h3>
                </Link>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  {" "}
                  {/* Reduced space */}
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" /> {/* Reduced mr */}
                    <span>{article.publishedTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-red-600 text-white p-4 rounded-full shadow-2xl hover:bg-red-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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
