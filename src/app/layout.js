import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navigation";
import Footer from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://thesamachar.vercel.app"),
  title: "The Samachar - Nepali News Aggregator",
  description:
    "Stay updated with the latest Nepali news from leading sources. The Samachar aggregates news from Kantipur, The Kathmandu Post, The Rising Nepal, and more. Get breaking news, politics, business, sports, and cultural insights from Nepal.",
  keywords: [
    "Nepali news",
    "Nepal news",
    "news aggregator",
    "Kantipur",
    "The Kathmandu Post",
    "The Rising Nepal",
    "breaking news",
    "politics",
    "business",
    "sports",
    "culture",
    "Nepal",
    "समाचार",
    "नेपाली समाचार",
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
  openGraph: {
    title: "The Samachar - Nepali News Aggregator",
    description:
      "Stay updated with the latest Nepali news from leading sources. The Samachar aggregates news from Kantipur, The Kathmandu Post, The Rising Nepal, and more. Get breaking news, politics, business, sports, and cultural insights from Nepal.",
    siteName: "The Samachar",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Samachar - Nepali News Aggregator",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  github: {
    title: "The Samachar - Nepali News Aggregator",
    description:
      "Source code for The Samachar, a Nepali news aggregator. Built with Next.js and Node.js.",
    images: ["/github-repo-image.png"],
    username: "Aayush-khadka",
    repo: "Nepali-News-Aggregrator",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  // themeColor: "#ffffff", // Remove themeColor from here
  viewport: {
    themeColor: "#ffffff", // Add themeColor here
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
