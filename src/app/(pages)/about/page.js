// "use client";

// import React from "react";
// import {
//   Newspaper,
//   Globe,
//   Briefcase,
//   Volleyball,
//   Clock,
//   Search,
//   Github,
//   Mail,
//   ExternalLink,
//   Zap,
//   Heart,
//   TrendingUp,
//   Layout,
//   Smartphone,
//   Share2,
//   BookOpen,
//   Music,
//   Camera,
//   UserCheck,
//   Map,
//   Coffee,
// } from "lucide-react";
// import Link from "next/link";

// const AboutPage = () => {
//   const coverageAreas = [
//     {
//       icon: <Globe className="w-6 h-6 text-red-600" />,
//       title: "Politics",
//       description:
//         "Comprehensive coverage of political developments, government policies, and national affairs",
//     },
//     {
//       icon: <Briefcase className="w-6 h-6 text-red-600" />,
//       title: "Business",
//       description:
//         "Latest updates on Nepal's economy, market trends, and financial news",
//     },
//     {
//       icon: <Volleyball className="w-6 h-6 text-red-600" />,
//       title: "Sports",
//       description:
//         "In-depth coverage of Nepali sports, athletes, and sporting events",
//     },
//     {
//       icon: <Camera className="w-6 h-6 text-red-600" />,
//       title: "Entertainment",
//       description:
//         "Updates from Nepal's film industry, music scene, and cultural events",
//     },
//     {
//       icon: <Map className="w-6 h-6 text-red-600" />,
//       title: "Travel",
//       description:
//         "Discover Nepal's destinations, tourism news, and travel industry updates",
//     },
//     {
//       icon: <BookOpen className="w-6 h-6 text-red-600" />,
//       title: "Education",
//       description:
//         "News about educational policies, institutions, and academic achievements",
//     },
//     {
//       icon: <Coffee className="w-6 h-6 text-red-600" />,
//       title: "Lifestyle",
//       description:
//         "Stories about Nepali culture, food, fashion, and modern living",
//     },
//     {
//       icon: <TrendingUp className="w-6 h-6 text-red-600" />,
//       title: "Technology",
//       description:
//         "Coverage of tech innovations, digital trends, and startup ecosystem",
//     },
//   ];

//   const features = [
//     {
//       icon: <Zap className="w-8 h-8 text-red-600" />,
//       title: "Real-Time Updates",
//       description:
//         "Get the latest news as it happens with our advanced scraping technology",
//     },
//     {
//       icon: <Search className="w-8 h-8 text-red-600" />,
//       title: "Smart Search",
//       description:
//         "Find relevant news quickly with our intelligent search system",
//     },
//     {
//       icon: <Layout className="w-8 h-8 text-red-600" />,
//       title: "Clean Interface",
//       description:
//         "Enjoy a clutter-free reading experience with our modern design",
//     },
//     {
//       icon: <Smartphone className="w-8 h-8 text-red-600" />,
//       title: "Mobile Optimized",
//       description: "Access news seamlessly across all your devices",
//     },
//     {
//       icon: <Share2 className="w-8 h-8 text-red-600" />,
//       title: "Easy Sharing",
//       description: "Share important stories with your network instantly",
//     },
//     {
//       icon: <UserCheck className="w-8 h-8 text-red-600" />,
//       title: "Personalization",
//       description: "Customize your news feed based on your interests",
//     },
//   ];

//   const sources = [
//     "The Kathmandu Post",
//     "The Rising Nepal",
//     "Nepali Times",
//     "República",
//     "The Himalayan Times",
//     "Online Khabar",
//     "MyRepública",
//     "Spotlight Nepal",
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section with Gradient Background */}
//       <div className="relative overflow-hidden bg-gradient-to-b from-red-50 to-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
//           <div className="text-center">
//             <h1 className="text-5xl font-bold text-gray-900 mb-6">
//               The Samachar
//             </h1>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Your comprehensive source for English news from Nepal, bringing
//               together stories from the nation's most trusted media outlets in
//               one place.
//             </p>
//           </div>
//         </div>
//         <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
//       </div>

//       {/* Mission Statement */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row items-center gap-12">
//           <div className="flex-shrink-0">
//             <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
//               <Newspaper className="w-10 h-10 text-red-600" />
//             </div>
//           </div>
//           <div>
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">
//               Our Mission
//             </h2>
//             <p className="text-lg text-gray-600 leading-relaxed">
//               We strive to simplify your news experience by providing a single,
//               user-friendly platform where you can access the most important
//               stories shaping Nepal. Through innovative technology and careful
//               curation, we bring you comprehensive coverage of the news that
//               matters.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Coverage Areas Grid */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
//             Comprehensive Coverage
//           </h2>
//           <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
//             Stay informed across all aspects of Nepali society with our diverse
//             news categories
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {coverageAreas.map((area, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
//               >
//                 <div className="flex flex-col items-start gap-4">
//                   <div className="p-3 bg-red-50 rounded-lg">{area.icon}</div>
//                   <h3 className="text-xl font-bold text-gray-900">
//                     {area.title}
//                   </h3>
//                   <p className="text-gray-600">{area.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
//           Platform Features
//         </h2>
//         <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
//           Experience news reading reimagined with our modern features
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="p-6 bg-white rounded-xl border border-gray-100 hover:border-red-100 hover:shadow-lg transition-all duration-300"
//             >
//               <div className="flex items-start gap-4">
//                 <div className="flex-shrink-0">{feature.icon}</div>
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-2">
//                     {feature.title}
//                   </h3>
//                   <p className="text-gray-600">{feature.description}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Sources Section with New Design */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">
//               Trusted Sources
//             </h2>
//             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//               We aggregate news from Nepal's leading English-language
//               publications to ensure you get comprehensive and reliable coverage
//             </p>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {sources.map((source, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-4 rounded-lg text-center hover:shadow-md transition-shadow duration-300"
//               >
//                 <span className="text-gray-800 font-medium">{source}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Creator Section */}
//       <section className="py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-sm p-8 md:p-12">
//             <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
//               Built with ❤️ by Aayush Khadka
//             </h2>
//             <p className="text-lg text-gray-600 text-center mb-8 max-w-3xl mx-auto">
//               The Samachar is a personal project created to make Nepali news
//               more accessible to English-speaking readers. Built using modern
//               web technologies including Next.js and Node.js.
//             </p>
//             <div className="flex flex-wrap justify-center gap-6">
//               <Link
//                 href="https://github.com/Aayush-khadka/Nepali-News-Aggregrator-Backend"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors duration-300"
//               >
//                 <Github className="w-5 h-5" />
//                 <span>View on GitHub</span>
//                 <ExternalLink className="w-4 h-4" />
//               </Link>
//               <a
//                 href="mailto:khadkaaayush90@gmail.com"
//                 className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors duration-300"
//               >
//                 <Mail className="w-5 h-5" />
//                 <span>Contact Us</span>
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
//         <h2 className="text-3xl font-bold text-gray-900 mb-6">
//           Start Exploring Nepal's News
//         </h2>
//         <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
//           Join our growing community of readers who rely on The Samachar for
//           their daily news updates.
//         </p>
//         <Link
//           href="/"
//           className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-300"
//         >
//           Browse Latest News
//         </Link>
//       </section>
//     </div>
//   );
// };

// export default AboutPage;

// "use client";

// import React, { useState } from "react";
// import {
//   Newspaper,
//   Globe,
//   Briefcase,
//   Volleyball,
//   Clock,
//   Search,
//   Github,
//   Mail,
//   ExternalLink,
//   Zap,
//   Heart,
//   TrendingUp,
//   Layout,
//   Smartphone,
//   Share2,
//   BookOpen,
//   Music,
//   Camera,
//   UserCheck,
//   Map,
//   Coffee,
//   Lightbulb,
//   MessageSquare,
// } from "lucide-react";
// import Link from "next/link";

// const AboutPage = () => {
//   const coverageAreas = [
//     {
//       icon: <Globe className="w-6 h-6 text-red-600" />,
//       title: "Politics",
//       description:
//         "Comprehensive coverage of political developments, government policies, and national affairs",
//     },
//     {
//       icon: <Briefcase className="w-6 h-6 text-red-600" />,
//       title: "Business",
//       description:
//         "Latest updates on Nepal's economy, market trends, and financial news",
//     },
//     {
//       icon: <Volleyball className="w-6 h-6 text-red-600" />,
//       title: "Sports",
//       description:
//         "In-depth coverage of Nepali sports, athletes, and sporting events",
//     },
//     {
//       icon: <Camera className="w-6 h-6 text-red-600" />,
//       title: "Entertainment",
//       description:
//         "Updates from Nepal's film industry, music scene, and cultural events",
//     },
//     {
//       icon: <Map className="w-6 h-6 text-red-600" />,
//       title: "Travel",
//       description:
//         "Discover Nepal's destinations, tourism news, and travel industry updates",
//     },
//     {
//       icon: <BookOpen className="w-6 h-6 text-red-600" />,
//       title: "Education",
//       description:
//         "News about educational policies, institutions, and academic achievements",
//     },
//     {
//       icon: <Coffee className="w-6 h-6 text-red-600" />,
//       title: "Lifestyle",
//       description:
//         "Stories about Nepali culture, food, fashion, and modern living",
//     },
//     {
//       icon: <TrendingUp className="w-6 h-6 text-red-600" />,
//       title: "Technology",
//       description:
//         "Coverage of tech innovations, digital trends, and startup ecosystem",
//     },
//   ];

//   const features = [
//     {
//       icon: <Zap className="w-8 h-8 text-red-600" />,
//       title: "Real-Time Updates",
//       description:
//         "Get the latest news as it happens with our advanced scraping technology",
//     },
//     {
//       icon: <Search className="w-8 h-8 text-red-600" />,
//       title: "Smart Search",
//       description:
//         "Find relevant news quickly with our intelligent search system",
//     },
//     {
//       icon: <Layout className="w-8 h-8 text-red-600" />,
//       title: "Clean Interface",
//       description:
//         "Enjoy a clutter-free reading experience with our modern design",
//     },
//     {
//       icon: <Smartphone className="w-8 h-8 text-red-600" />,
//       title: "Mobile Optimized",
//       description: "Access news seamlessly across all your devices",
//     },
//     {
//       icon: <Share2 className="w-8 h-8 text-red-600" />,
//       title: "Easy Sharing",
//       description: "Share important stories with your network instantly",
//     },
//     {
//       icon: <UserCheck className="w-8 h-8 text-red-600" />,
//       title: "Personalization",
//       description: "Customize your news feed based on your interests",
//     },
//   ];

//   const sources = [
//     "The Kathmandu Post",
//     "The Rising Nepal",
//     "Nepali Times",
//     "República",
//     "The Himalayan Times",
//     "Online Khabar",
//     "MyRepública",
//     "Spotlight Nepal",
//   ];

//   const faqs = [
//     {
//       question: "How often is the news updated?",
//       answer:
//         "Our news is updated in real-time, ensuring you get the latest information as it happens.",
//     },
//     {
//       question: "Is the service free to use?",
//       answer: "Yes, The Samachar is completely free to use.",
//     },
//     {
//       question: "Can I suggest a news source?",
//       answer:
//         "Absolutely! Please contact us with your suggestions, and we'll consider adding them.",
//     },
//   ];

//   const [activeFAQ, setActiveFAQ] = useState(null);

//   const toggleFAQ = (index) => {
//     setActiveFAQ(activeFAQ === index ? null : index);
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section with Gradient Background */}
//       <div className="relative overflow-hidden bg-gradient-to-b from-red-50 to-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
//           <div className="text-center">
//             <h1 className="text-5xl font-bold text-gray-900 mb-6">
//               The Samachar
//             </h1>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Your comprehensive source for English news from Nepal, bringing
//               together stories from the nation's most trusted media outlets in
//               one place.
//             </p>
//           </div>
//         </div>
//         <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
//       </div>

//       {/* Mission Statement */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row items-center gap-12">
//           <div className="flex-shrink-0">
//             <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
//               <Newspaper className="w-10 h-10 text-red-600" />
//             </div>
//           </div>
//           <div>
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">
//               Our Mission
//             </h2>
//             <p className="text-lg text-gray-600 leading-relaxed">
//               We strive to simplify your news experience by providing a single,
//               user-friendly platform where you can access the most important
//               stories shaping Nepal. Through innovative technology and careful
//               curation, we bring you comprehensive coverage of the news that
//               matters.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Coverage Areas Grid */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
//             Comprehensive Coverage
//           </h2>
//           <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
//             Stay informed across all aspects of Nepali society with our diverse
//             news categories
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {coverageAreas.map((area, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
//               >
//                 <div className="flex flex-col items-start gap-4">
//                   <div className="p-3 bg-red-50 rounded-lg">{area.icon}</div>
//                   <h3 className="text-xl font-bold text-gray-900">
//                     {area.title}
//                   </h3>
//                   <p className="text-gray-600">{area.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
//           Platform Features
//         </h2>
//         <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
//           Experience news reading reimagined with our modern features
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="p-6 bg-white rounded-xl border border-gray-100 hover:border-red-100 hover:shadow-lg transition-all duration-300"
//             >
//               <div className="flex items-start gap-4">
//                 <div className="flex-shrink-0">{feature.icon}</div>
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-2">
//                     {feature.title}
//                   </h3>
//                   <p className="text-gray-600">{feature.description}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Sources Section with New Design */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">
//               Trusted Sources
//             </h2>
//             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//               We aggregate news from Nepal's leading English-language
//               publications to ensure you get comprehensive and reliable coverage
//             </p>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {sources.map((source, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-4 rounded-lg text-center hover:shadow-md transition-shadow duration-300"
//               >
//                 <span className="text-gray-800 font-medium">{source}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
//           Frequently Asked Questions
//         </h2>
//         <div className="space-y-4">
//           {faqs.map((faq, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
//             >
//               <button
//                 className="w-full text-left py-4 px-6 font-medium text-gray-900 flex items-center justify-between"
//                 onClick={() => toggleFAQ(index)}
//               >
//                 <span>{faq.question}</span>
//                 <span>{activeFAQ === index ? "-" : "+"}</span>
//               </button>
//               <div
//                 className={`px-6 pb-4 text-gray-600 ${
//                   activeFAQ === index ? "block" : "hidden"
//                 }`}
//               >
//                 {faq.answer}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
//             What Our Readers Say
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
//               <p className="text-gray-700 italic mb-4">
//                 "The Samachar has become my go-to source for Nepali news. It's
//                 easy to use and provides a comprehensive overview of what's
//                 happening in Nepal."
//               </p>
//               <p className="text-gray-900 font-medium">- Aayush Khadka</p>
//             </div>
//             <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
//               <p className="text-gray-700 italic mb-4">
//                 "I love the clean interface and the fact that I can find news
//                 from multiple sources in one place. It saves me so much time!"
//               </p>
//               <p className="text-gray-900 font-medium">- Someone Else</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Creator Section */}
//       <section className="py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-sm p-8 md:p-12">
//             <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
//               Built with ❤️ by Aayush Khadka
//             </h2>
//             <p className="text-lg text-gray-600 text-center mb-8 max-w-3xl mx-auto">
//               The Samachar is a personal project created to make Nepali news
//               more accessible to English-speaking readers. Built using modern
//               web technologies including Next.js and Node.js.
//             </p>
//             <div className="flex flex-wrap justify-center gap-6">
//               <Link
//                 href="https://github.com/Aayush-khadka/Nepali-News-Aggregrator-Backend"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors duration-300"
//               >
//                 <Github className="w-5 h-5" />
//                 <span>View on GitHub</span>
//                 <ExternalLink className="w-4 h-4" />
//               </Link>
//               <a
//                 href="mailto:khadkaaayush90@gmail.com"
//                 className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors duration-300"
//               >
//                 <Mail className="w-5 h-5" />
//                 <span>Contact Us</span>
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
//         <h2 className="text-3xl font-bold text-gray-900 mb-6">
//           Start Exploring Nepal's News
//         </h2>
//         <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
//           Join our growing community of readers who rely on The Samachar for
//           their daily news updates.
//         </p>
//         <Link
//           href="/"
//           className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-300"
//         >
//           Browse Latest News
//         </Link>
//       </section>
//     </div>
//   );
// };

// export default AboutPage;

"use client";

import React, { useState, useEffect } from "react";
import {
  Newspaper,
  Globe,
  Briefcase,
  Volleyball,
  Search,
  Github,
  Lightbulb,
  Mail,
  ExternalLink,
  Zap,
  Layout,
  Smartphone,
  Share2,
  BookOpen,
  Camera,
  UserCheck,
  Map,
  Coffee,
  TrendingUp,
  Heart,
  AlertCircle,
  Users,
  Shield,
  ChevronDown,
  Clock,
  Chart,
  Award,
  Ellipsis,
} from "lucide-react";
import Link from "next/link";

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState("platform");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const stats = [
    { number: "1K+", label: "Articles Available" },
    { number: "8+", label: "News Sources" },
    { number: "12", label: "Categories" },
    { number: "24/7", label: "Updates" },
  ];

  const coverageAreas = [
    {
      icon: <Globe className="w-6 h-6 text-red-600" />,
      title: "Politics",
      description:
        "Comprehensive coverage of political developments and policies",
    },
    {
      icon: <Briefcase className="w-6 h-6 text-red-600" />,
      title: "Business",
      description: "Latest updates on Nepal's economy and market trends",
    },
    {
      icon: <Shield className="w-6 h-6 text-red-600" />,
      title: "Health",
      description: "Coverage of healthcare developments and wellness",
    },
    {
      icon: <Camera className="w-6 h-6 text-red-600" />,
      title: "Entertainment",
      description: "Updates from Nepal's film industry and cultural scene",
    },
    {
      icon: <Users className="w-6 h-6 text-red-600" />,
      title: "National",
      description: "Stories about community initiatives and social development",
    },
    {
      icon: <Ellipsis className="w-6 h-6 text-red-600" />,
      title: "And Many More..",
      description: "And other various 10+ Areas",
    },
  ];

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-red-600" />,
      title: "Real-Time Updates",
      description: "Get the latest news as it happens",
    },
    {
      icon: <Layout className="w-8 h-8 text-red-600" />,
      title: "Clean Interface",
      description: "Enjoy a clutter-free reading experience",
    },
    {
      icon: <UserCheck className="w-8 h-8 text-red-600" />,
      title: "Personalization",
      description: "Customize your news feed to your interests",
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-red-600" />, // Or another relevant icon
      title: "AI-Powered Summaries",
      description:
        "Get the gist in seconds. AI generates concise summaries of articles, saving you time.",
    },
    {
      icon: <Smartphone className="w-8 h-8 text-red-600" />,
      title: "Mobile Optimized",
      description:
        "Access news seamlessly on any device. Read on the go with our responsive design.",
    },
    {
      icon: <Share2 className="w-8 h-8 text-red-600" />,
      title: "Easy Sharing",
      description:
        "Spread the word. Share articles with your friends and colleagues on social media.",
    },
  ];

  const faqs = [
    {
      question: "How often is the news updated?",
      answer:
        "We update our news feed in real-time, 24/7, ensuring you receive the very latest stories from Nepal as soon as they are published. Our system constantly monitors and aggregates news from various sources to keep you informed.",
    },
    {
      question: "Is The Samachar free to use?",
      answer:
        "Yes, The Samachar is completely free! We are committed to providing accessible and unbiased news to everyone. You can access all our content without any subscription fees or hidden charges.",
    },
    {
      question: "How can I suggest a news source to be included?",
      answer:
        "We're always looking to expand our coverage! Please visit our 'Contact Us' page and send us the name and website of the news source you'd like us to consider. We appreciate your input!",
    },
    {
      question: "Does The Samachar produce its own original content?",
      answer:
        "Currently, The Samachar focuses on aggregating news from Nepal's leading media outlets. However, we are exploring the possibility of creating original content in the future. Stay tuned for updates!",
    },
    {
      question: "How can I report an error or provide feedback?",
      answer:
        "We value your feedback! If you spot an error or have suggestions for improving The Samachar, please use the 'Contact Us' form on our website. We appreciate your help in ensuring the accuracy and quality of our news aggregation.",
    },
    {
      question: "Do you have a newsletter I can subscribe to?",
      answer:
        "Not yet, but we're excited to announce that we're planning to launch a weekly newsletter soon! It will provide a concise summary of the week's top news stories from Nepal. Stay tuned for updates!",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-red-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4">
              <Newspaper className="h-12 w-12 text-red-500" />
              <h1 className="text-5xl font-bold text-gray-900 leading-none">
                The Samachar
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
              Your comprehensive source for Nepal Related News in English,
              bringing together stories from the nation's most trusted media
              outlets in one place.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <p className="text-3xl font-bold text-red-600 group-hover:scale-110 transition-transform">
                  {stat.number}
                </p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Areas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            News Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coverageAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-start gap-4">
                  <div className="p-3 bg-red-50 rounded-lg">{area.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {area.title}
                  </h3>
                  <p className="text-gray-600">{area.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl border border-gray-100 hover:border-red-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="p-3 bg-red-50 rounded-full">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Common Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() =>
                    setActiveFAQ(activeFAQ === index ? null : index)
                  }
                  className="w-full text-left p-6 focus:outline-none"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        activeFAQ === index ? "transform rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>
                <div
                  className={`px-6 pb-6 transition-all duration-300 ${
                    activeFAQ === index ? "block" : "hidden"
                  }`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-sm p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Built with <Heart className="w-6 h-6 text-red-600 inline" /> by
              Aayush Khadka
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              The Samachar is a personal project created to make Nepali news
              more accessible to English-speaking readers, built using modern
              web technologies.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="https://github.com/Aayush-khadka/Nepali-News-Aggregrator-Backend"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors duration-300"
              >
                <Github className="w-5 h-5" />
                <span>View on GitHub</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Start Exploring Nepal's News
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our growing community of readers who rely on The Samachar for
            their daily news updates.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-all duration-300 transform hover:-translate-y-1"
          >
            Browse Latest News
          </Link>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors duration-300"
          aria-label="Scroll to top"
        >
          <ChevronDown className="w-6 h-6 transform rotate-180" />
        </button>
      )}
    </div>
  );
};

export default AboutPage;
