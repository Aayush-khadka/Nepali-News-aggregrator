"use client";

import { FaLinkedin, FaGithub } from "react-icons/fa";
import Link from "next/link";

// General Links Component (Merged with Legal Links)
const GeneralLinks = () => (
  <div className="text-center md:text-left">
    <h2 className="text-lg font-serif font-semibold mb-4 text-gray-700">
      General Links
    </h2>
    <ul className="space-y-2">
      <li>
        <Link href="/" className="hover:text-red-600 transition duration-200">
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/about"
          className="hover:text-red-600 transition duration-200"
        >
          About
        </Link>
      </li>
      <li>
        <Link
          href="/privacy"
          className="hover:text-red-600 transition duration-200"
        >
          Privacy Policy
        </Link>
      </li>
      <li>
        <Link
          href="/terms"
          className="hover:text-red-600 transition duration-200"
        >
          Terms of Service
        </Link>
      </li>
    </ul>
  </div>
);

const NewsCategories = () => {
  return (
    <div className="text-center md:text-left">
      <h2 className="text-lg font-serif font-semibold mb-4 text-gray-700">
        News Categories
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Link
            href="/politics"
            className="hover:text-red-600 transition duration-200 block mb-2"
          >
            Politics
          </Link>
          <Link
            href="/world"
            className="hover:text-red-600 transition duration-200 block mb-2"
          >
            World
          </Link>
          <Link
            href="/business"
            className="hover:text-red-600 transition duration-200 block mb-2"
          >
            Business
          </Link>
          <Link
            href="/sports"
            className="hover:text-red-600 transition duration-200 block mb-2"
          >
            Sports
          </Link>
          <Link
            href="/editorial"
            className="hover:text-red-600 transition duration-200 block mb-2"
          >
            Editorial
          </Link>
        </div>
        <div>
          <Link
            href="/health"
            className="hover:text-red-600 transition duration-200 block mb-2"
          >
            Health
          </Link>
          <Link
            href="/science-tech"
            className="hover:text-red-600 transition duration-200 block mb-2"
          >
            Science & Technology
          </Link>
          <Link
            href="/art-culture"
            className="hover:text-red-600 transition duration-200 block mb-2"
          >
            Art & Culture
          </Link>
          <Link
            href="/national"
            className="hover:text-red-600 transition duration-200 block mb-2"
          >
            National
          </Link>
        </div>
      </div>
    </div>
  );
};

// Contact Information Component
const ContactInfo = () => (
  <div className="text-center md:text-left">
    <h2 className="text-lg font-serif font-semibold mb-4 text-gray-700">
      Contact Us
    </h2>
    <ul className="space-y-2">
      <li>
        <p className="text-sm mb-2 text-gray-600">
          Email:{" "}
          <a
            href="mailto:khadkaaayush90@gmail.com"
            className="hover:text-red-600 transition duration-200"
          >
            khadkaaayush90@gmail.com
          </a>
        </p>
      </li>
      <li>
        <p className="text-sm text-gray-600">
          Location: Amrit Marga, Kathmandu, Nepal
        </p>
      </li>
    </ul>
  </div>
);

// Sources Component with Logos
const Sources = () => (
  <div className="text-center md:text-left">
    <h2 className="text-lg font-serif font-semibold mb-4 text-gray-700">
      News Sources
    </h2>
    <ul className="space-y-2">
      <li className="flex items-center justify-center md:justify-start">
        <a
          href="https://kathmandupost.com"
          className="hover:text-red-600 transition duration-200 flex items-center text-gray-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/k-logo.png" // Path to the logo in the public directory
            alt="Kathmandu Post"
            className="h-6 mr-2" // Adjust height as needed
          />
          The Kathmandu Post
        </a>
      </li>
      <li className="flex items-center justify-center md:justify-start">
        <a
          href="https://risingnepaldaily.com/"
          className="hover:text-red-600 transition duration-200 flex items-center text-gray-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/rlogo.jpg" // Path to the logo in the public directory
            alt="The Rising Nepal"
            className="h-6 mr-2" // Adjust height as needed
          />
          The Rising Nepal
        </a>
      </li>
      {/* Add more sources as needed */}
    </ul>
  </div>
);

// Main Footer Component
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-black py-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <GeneralLinks />
          <NewsCategories />
          <ContactInfo />
          <Sources />
        </div>

        <div className="mt-12 flex flex-col items-center">
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/Aayush-khadka/Nepali-News-Aggregrator-Backend"
              className="hover:text-gray-600 transition duration-200 text-gray-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/aayush-khadka-0513931b0/"
              className="hover:text-blue-600 transition duration-200 text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Made with <span className="text-blue-500">💛</span> by Aayush Khadka
          </p>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-6 text-center">
          <p className="text-sm font-serif text-gray-500">
            &copy; {currentYear} The Samachar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
