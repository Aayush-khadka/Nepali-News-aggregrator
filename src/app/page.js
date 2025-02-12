"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import Badge from "./components/badge";
import Toast from "./components/toast";

export default function HomePage() {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [categoryArticles, setCategoryArticles] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const categories = [
    { name: "Politics", icon: Globe, slug: "politics" },
    { name: "Business", icon: Briefcase, slug: "business" },
    { name: "Sports", icon: Volleyball, slug: "sports" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Helper function to safely fetch and parse response
        const safeFetch = async (url, type) => {
          try {
            const response = await fetch(url);

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const text = await response.text();

            try {
              const data = JSON.parse(text);

              // Handle different response formats
              if (Array.isArray(data)) {
                // Direct array response
                return data;
              } else if (data.data) {
                // Nested response with data property
                if (Array.isArray(data.data)) {
                  return data.data;
                } else if (
                  data.data.results &&
                  Array.isArray(data.data.results)
                ) {
                  return data.data.results;
                }
              }

              console.warn(
                `Warning: ${type} response has unexpected structure:`,
                data
              );
              return []; // Return empty array as fallback
            } catch (parseError) {
              console.error(`Failed to parse ${type} JSON:`, text);
              throw new Error(`Invalid JSON in ${type} response`);
            }
          } catch (fetchError) {
            console.error(`Error fetching ${type}:`, fetchError);
            throw new Error(`Failed to fetch ${type}: ${fetchError.message}`);
          }
        };

        // Fetch all data with improved error handling
        const [featuredData, trendingData, ...categoriesData] =
          await Promise.all([
            safeFetch(
              "https://nepali-news-aggregrator-backend.vercel.app/api/v1/articles/get-latest-articles",
              "featured articles"
            ),
            safeFetch(
              "https://nepali-news-aggregrator-backend.vercel.app/api/v1/articles/trending",
              "trending articles"
            ),
            ...categories.map((cat) =>
              safeFetch(
                `https://nepali-news-aggregrator-backend.vercel.app/api/v1/category/${cat.slug}`,
                `${cat.name} category`
              )
            ),
          ]);

        // Safely set state with validated data
        setFeaturedArticles(
          Array.isArray(featuredData) ? featuredData.slice(0, 3) : []
        );
        setTrendingArticles(
          Array.isArray(trendingData) ? trendingData.slice(0, 5) : []
        );

        const categoryArticlesMap = {};
        categories.forEach((cat, index) => {
          const categoryItems = Array.isArray(categoriesData[index])
            ? categoriesData[index].slice(0, 4)
            : [];
          categoryArticlesMap[cat.slug] = categoryItems;
        });
        setCategoryArticles(categoryArticlesMap);
      } catch (err) {
        console.error("Error in data fetching:", err);
        setError(err.message || "Failed to load content");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Rest of the component remains exactly the same...
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
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      {/* Enhanced Featured Section with Hero Layout */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="bg-red-600 w-2 h-8 mr-3 rounded-full"></span>
          Featured Stories
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article, index) => (
            <div
              key={article._id}
              className={`relative group ${
                index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <div className="relative h-[300px] overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
                <img
                  src={article.articleImage}
                  alt={article.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  onError={(e) =>
                    (e.target.src =
                      "https://res.cloudinary.com/dbdyrmfbc/image/upload/v1738399320/qxh5ezn8rcalsj2cwalw.jpg")
                  }
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity group-hover:opacity-90">
                  <div className="absolute bottom-0 p-6 w-full">
                    <Badge className="mb-3 bg-red-600 text-white hover:bg-red-700">
                      {article.category || "Featured"}
                    </Badge>

                    <Link href={`/article/${article._id}`}>
                      <h2 className="text-white text-xl md:text-2xl font-bold mb-3 hover:text-red-400 transition-colors line-clamp-2">
                        {article.title}
                      </h2>
                    </Link>

                    {index === 0 && article.description && (
                      <p className="text-gray-200 mb-4 line-clamp-2 text-sm md:text-base">
                        {article.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-200 text-sm">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{article.publishedTime}</span>
                        <span className="mx-2">•</span>
                        <span>{article.source}</span>
                      </div>

                      <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleArticleShare(article._id);
                          }}
                          className="text-white hover:text-red-400 transition-colors"
                        >
                          <Share2 className="w-5 h-5" />
                        </button>
                        <Link
                          href={`/article/${article._id}`}
                          className="text-white hover:text-red-400 transition-colors"
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

      {/* Modernized Trending Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8 border-b pb-4">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <TrendingUp className="text-red-600" />
            Trending Now
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {trendingArticles.map((article, index) => (
            <Link key={article._id} href={`/article/${article._id}`}>
              <div className="group bg-white rounded-xl p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 h-full relative overflow-hidden">
                <span className="absolute -top-4 -left-4 text-8xl font-bold text-gray-100 group-hover:text-red-100 transition-colors z-0">
                  {index + 1}
                </span>
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-red-600 transition-colors line-clamp-3 mb-4">
                    {article.title}
                  </h3>
                  <div className="text-sm text-gray-500 font-medium">
                    {article.source}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Refined Category Sections */}
      {categories.map((category) => (
        <section key={category.slug} className="mb-16">
          <div className="flex items-center justify-between mb-8 border-b pb-4">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <category.icon className="text-red-600" />
              {category.name}
            </h2>
            <Link href={`/${category.slug}`}>
              <span className="text-red-600 hover:text-red-700 font-medium text-lg">
                View All →
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categoryArticles[category.slug]?.map((article) => (
              <div key={article._id} className="group">
                <div className="mb-4 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="relative h-56">
                    <img
                      src={article.articleImage}
                      alt={article.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      onError={(e) =>
                        (e.target.src =
                          "https://res.cloudinary.com/dbdyrmfbc/image/upload/v1738399320/qxh5ezn8rcalsj2cwalw.jpg")
                      }
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <Link href={`/article/${article._id}`}>
                  <h3 className="font-bold text-xl text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2 mb-3">
                    {article.title}
                  </h3>
                </Link>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{article.publishedTime}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-red-600 text-white p-4 rounded-full shadow-xl hover:bg-red-700 transition-all duration-300 hover:shadow-2xl"
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
