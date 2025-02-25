"use client";
import React, { useState, useEffect } from "react";
import { Calendar, Filter, ChevronRight, Loader2, Menu, X } from "lucide-react";

const NewsletterPage = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [groupedNewsletters, setGroupedNewsletters] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [readingTime, setReadingTime] = useState({});

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/v1/newsletter/newsletter"
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
  }, []);

  const categories = [
    { id: "all", name: "All Categories", icon: "📰", color: "gray" },
    { id: "national", name: "National", icon: "🇳🇵", color: "orange" },
    { id: "politics", name: "Politics", icon: "🏛️", color: "gold" },
    { id: "world", name: "World", icon: "🌍", color: "red" },
    { id: "sports", name: "Sports", icon: "🏃‍♂️", color: "blue" },
    { id: "money", name: "Money", icon: "💰", color: "green" },
    { id: "health", name: "Health", icon: "⚕️", color: "teal" },
    { id: "valley", name: "Valley", icon: "🏔️", color: "brown" },
    {
      id: "science-technology",
      name: "Science & Technology",
      icon: "🔬",
      color: "indigo",
    },
    { id: "opinion", name: "Opinion", icon: "💭", color: "purple" },
    { id: "art-culture", name: "Art & Culture", icon: "🎨", color: "pink" },
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
      const matchesCategory =
        activeCategory === "all" || newsletter.category === activeCategory;
      return matchesCategory;
    });
  };

  const handleShare = async (newsletter) => {
    try {
      await navigator.share({
        title: `Newsletter - ${formatDate(newsletter.date)}`,
        text: newsletter.newsletter.substring(0, 100) + "...",
        url: window.location.href,
      });
    } catch (err) {
      console.log("Sharing failed:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-50 p-6 rounded-xl text-red-600 max-w-md mx-4">
          <h3 className="text-xl font-bold mb-3">Unable to Load Newsletters</h3>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Newsletter</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          >
            {isSidebarOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar */}
          <aside
            className={`
              lg:w-72 flex-shrink-0
              fixed lg:relative inset-0 z-40
              transform lg:transform-none transition-transform duration-300 ease-in-out
              ${
                isSidebarOpen
                  ? "translate-x-0"
                  : "-translate-x-full lg:translate-x-0"
              }
              bg-white lg:bg-transparent
              overflow-y-auto lg:overflow-visible
              pt-4 pb-12 lg:py-0
            `}
          >
            <div className="px-4 lg:px-0 space-y-6">
              {/* Archives */}
              <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4 lg:mb-6 flex items-center gap-2 text-gray-900">
                  <Calendar className="h-5 w-5 text-red-600" />
                  Archives
                </h3>
                <div className="space-y-1.5">
                  {Object.keys(groupedNewsletters)
                    .sort((a, b) => new Date(b) - new Date(a))
                    .map((date) => (
                      <button
                        key={date}
                        onClick={() => {
                          setSelectedDate(date);
                          setIsSidebarOpen(false);
                        }}
                        className={`
                          w-full px-3 py-2.5 rounded-lg text-left text-sm lg:text-base
                          transition-all duration-200 
                          ${
                            selectedDate === date
                              ? "bg-red-50 text-red-600 font-medium ring-1 ring-red-100"
                              : "hover:bg-gray-50 text-gray-700"
                          }
                        `}
                      >
                        {formatDate(date)}
                      </button>
                    ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4 lg:mb-6 flex items-center gap-2 text-gray-900">
                  <Filter className="h-5 w-5 text-red-600" />
                  Categories
                </h3>
                <div className="space-y-1.5">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`
                        w-full px-3 py-2.5 rounded-lg text-left flex items-center gap-3
                        text-sm lg:text-base transition-all duration-200 
                        ${
                          activeCategory === category.id
                            ? "bg-red-50 text-red-600 font-medium ring-1 ring-red-100"
                            : "hover:bg-gray-50 text-gray-700"
                        }
                      `}
                    >
                      <span className="text-lg">{category.icon}</span>
                      <span>{category.name}</span>
                      {activeCategory === category.id && (
                        <ChevronRight className="ml-auto h-4 w-4" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
              aria-hidden="true"
            />
          )}

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {selectedDate && (
              <div className="space-y-6 lg:space-y-8">
                {filterNewsletters(groupedNewsletters[selectedDate]).map(
                  (newsletter) => (
                    <article
                      key={newsletter._id}
                      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200"
                    >
                      <div className="p-4 sm:p-6 lg:p-8">
                        <div className="flex flex-wrap items-center gap-3 mb-6 lg:mb-8">
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-red-50 text-red-600">
                            {
                              categories.find(
                                (c) => c.id === newsletter.category
                              )?.icon
                            }
                            <span className="ml-2 capitalize">
                              {newsletter.category.replace(/-/g, " ")}
                            </span>
                          </span>
                        </div>
                        <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
                          {newsletter.newsletter
                            .split("\n\n")
                            .map((paragraph, idx) => (
                              <p
                                key={idx}
                                className="text-gray-700 leading-relaxed mb-4 lg:mb-6 last:mb-0"
                              >
                                {paragraph.trim()}
                              </p>
                            ))}
                        </div>
                      </div>
                    </article>
                  )
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPage;
