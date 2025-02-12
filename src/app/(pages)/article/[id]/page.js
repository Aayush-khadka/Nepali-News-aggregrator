"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { use } from "react";
import {
  Clock,
  User,
  Link as LinkIcon,
  Share2,
  TrendingUp,
  Newspaper,
  ChevronUp,
} from "lucide-react";
import Toast from "../../../components/toast";

export default function NewsStyleArticlePage({ params }) {
  const { id } = use(params);

  const [article, setArticle] = useState(null);
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Fetching data
  useEffect(() => {
    async function fetchData() {
      try {
        const articleResponse = await fetch(
          `https://nepali-news-aggregrator-backend.vercel.app/api/v1/articles/get-article/${id}`
        );
        const trendingResponse = await fetch(
          `https://nepali-news-aggregrator-backend.vercel.app/api/v1/articles/trending`
        );
        const relatedResponse = await fetch(
          `https://nepali-news-aggregrator-backend.vercel.app/api/v1/articles/get-latest-articles`
        );

        if (
          !articleResponse.ok ||
          !trendingResponse.ok ||
          !relatedResponse.ok
        ) {
          throw new Error("Failed to fetch data");
        }

        const articleData = await articleResponse.json();
        const trendingData = await trendingResponse.json();
        const relatedData = await relatedResponse.json();

        setArticle(articleData?.data);
        setTrendingArticles(trendingData?.data);
        setRelatedArticles(relatedData?.data?.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [id]);

  // Share function
  const handleShare = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  // Scroll to top function
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Error or loading state
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
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Article */}
        <div className="md:col-span-2">
          {/* Category */}
          <div className="text-red-600 uppercase font-bold text-sm mb-2">
            {article.tag[0] || "News"}
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>

          {/* Article Meta */}
          <div className="flex items-center justify-between text-gray-600 border-b pb-4 mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-sm">
                  {article.authorName || "Unknown"}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-sm">
                  {article.publishedTime || "Date Not Available"}
                </span>
              </div>
            </div>
            <button
              onClick={handleShare}
              className="text-gray-500 hover:text-blue-600 transition"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Featured Image */}
          {article.articleImage && (
            <div className="mb-6">
              <img
                src={article.articleImage}
                alt="Article image"
                className="object-cover w-full h-auto"
                onError={(e) =>
                  (e.target.src =
                    "https://res.cloudinary.com/dbdyrmfbc/image/upload/v1738399320/qxh5ezn8rcalsj2cwalw.jpg")
                }
              />
            </div>
          )}

          {/* Summary */}
          {article.summary && (
            <div className="border-l-4 border-red-600 pl-4 mb-6">
              <p className="text-lg font-semibold text-gray-800">
                {article.summary}
              </p>
            </div>
          )}

          {/* Article Content */}
          <div className="prose max-w-none text-gray-800 space-y-4">
            {article.articleText?.split("\n").map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Footer */}
          <footer className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2">
              <LinkIcon className="w-4 h-4 text-gray-500" />
              <a
                href={article.articleLink}
                target="_blank"
                className="text-gray-600 hover:text-red-600"
              >
                {article.source || "Unknown Source"}
              </a>
            </div>
            {article.tag?.length > 0 && (
              <div className="flex space-x-2 mt-2 md:mt-0">
                {article.tag.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </footer>
        </div>

        {/* Sidebar: Trending Articles */}
        <aside className="md:col-span-1">
          <div className="bg-gray-50 p-4 rounded-lg">
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

      {/* Related Articles */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3 flex items-center gap-2">
          <Newspaper className=" text-red-600 w-6 h-6" />
          Related News
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedArticles.length > 0 ? (
            relatedArticles.slice(0, 4).map((relatedArticle) => (
              <div
                key={relatedArticle._id}
                className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition transform hover:scale-105"
              >
                {relatedArticle.articleImage && (
                  <img
                    src={relatedArticle.articleImage}
                    alt={relatedArticle.title}
                    className="w-full h-32 object-cover"
                  />
                )}
                <div className="p-4">
                  <Link href={`/article/${relatedArticle._id}`}>
                    <h4 className="text-base font-semibold text-gray-700 hover:text-red-600 transition">
                      {relatedArticle.title}
                    </h4>
                  </Link>
                  <span className="bg-blue-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded-full">
                    {relatedArticle.tag[0]}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No related articles available.</p>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message="Link copied to clipboard!"
          onClose={() => setShowToast(false)}
        />
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
