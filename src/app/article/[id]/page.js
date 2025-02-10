"use client";
import Link from "next/link"; // I
import React, { useState, useEffect } from "react";
import { use } from "react"; // Import use from React
import {
  Clock,
  User,
  Link as LinkIcon,
  Share2,
  TrendingUp,
} from "lucide-react";

export default function NewsStyleArticlePage({ params }) {
  const { id } = use(params); // Unwrap params using use()

  const [article, setArticle] = useState(null);
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [relatedArticles, setRelatedArticles] = useState([]); // New state for related articles
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch main article
        const articleResponse = await fetch(
          `http://localhost:4000/api/v1/articles/get-article/${id}`
        );

        // Fetch trending articles
        const trendingResponse = await fetch(
          `http://localhost:4000/api/v1/articles/trending`
        );

        // Fetch related articles
        const relatedResponse = await fetch(
          `http://localhost:4000/api/v1/articles/get-latest-articles`
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
        console.log("heheahaha");
        const relatedData = await relatedResponse.json(); // Get related articles

        if (articleData?.data) {
          setArticle(articleData.data);
        } else {
          throw new Error("No article data found");
        }

        if (trendingData?.data) {
          setTrendingArticles(trendingData.data);
        }

        if (relatedData?.data?.results) {
          setRelatedArticles(relatedData.data.results); // Access the results array
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center py-10">{error}</div>;
  if (!article)
    return <div className="text-center py-10">No article found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Article Content */}
        <div className="md:col-span-2">
          {/* Category */}
          <div className="text-red-600 uppercase font-bold text-sm mb-2">
            {article.tag[0] || "News"}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>

          {/* Article Meta */}
          <div className="flex items-center justify-between text-gray-600 border-b pb-4 mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-sm">
                  {article.authorName || "Unknown Author"}
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
                alt={article.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              {article.imageCaption && (
                <p className="text-sm text-gray-600 mt-2 italic">
                  {article.imageCaption}
                </p>
              )}
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

          {/* Article Footer */}
          <footer className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <LinkIcon className="w-4 h-4 text-gray-500" />
              <a
                href={article.articleLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-red-600 transition"
              >
                {article.source || "Unknown Source"}
              </a>
            </div>

            {article.tag?.length > 0 && (
              <div className="flex space-x-2">
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

        {/* Sidebar - Trending Articles */}
        <aside className="md:col-span-1 bg-gray-50 p-4 rounded-lg max-h-screen overflow-y-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2 flex items-center">
            <TrendingUp className="mr-2 text-red-600" /> Trending Articles
          </h3>
          <div className="space-y-4">
            {trendingArticles.length > 0 ? (
              trendingArticles.slice(0, 7).map((trendingArticle) => (
                <div key={trendingArticle._id} className="border-b pb-2">
                  <Link
                    href={`/article/${trendingArticle._id}`}
                    className="block"
                  >
                    <h4 className="text-sm font-semibold text-gray-800 hover:text-red-600 transition line-clamp-2">
                      {trendingArticle.title}
                    </h4>
                  </Link>
                  <div className="flex items-center text-xs text-gray-500 mt-1 justify-between w-full">
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      <span>{trendingArticle.source}</span>
                    </div>
                    <span className="ml-auto bg-blue-100 text-black-800 text-xs font-semibold px-2 py-1 rounded-full">
                      {trendingArticle.tag[0]}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No trending articles available.</p>
            )}
          </div>
        </aside>
      </div>

      {/* Related News Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
          Related News
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Adjusted for 4 columns on large screens */}
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
    </div>
  );
}
