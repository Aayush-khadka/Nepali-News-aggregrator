"use client";

import { FaLinkedin, FaGithub } from "react-icons/fa";

// General Links Component
const GeneralLinks = () => (
  <div className="text-center md:text-left">
    <h2 className="text-lg font-serif font-semibold mb-4">General Links</h2>
    <ul className="space-y-2">
      <li>
        <a href="/home" className="hover:text-red-600 transition duration-200">
          Home
        </a>
      </li>
      <li>
        <a href="/about" className="hover:text-red-600 transition duration-200">
          About
        </a>
      </li>
    </ul>
  </div>
);

// News Categories Component
const NewsCategories = () => (
  <div className="text-center md:text-left">
    <h2 className="text-lg font-serif font-semibold mb-4">News Categories</h2>
    <div className="grid grid-cols-2 gap-4">
      <ul className="space-y-2">
        {["Politics", "World", "Business", "Sports"].map((category) => (
          <li key={category}>
            <a
              href={`/${category.toLowerCase()}`}
              className="hover:text-red-600 transition duration-200"
            >
              {category}
            </a>
          </li>
        ))}
      </ul>
      <ul className="space-y-2">
        {["Technology", "Health", "Entertainment", "Science"].map(
          (category) => (
            <li key={category}>
              <a
                href={`/${category.toLowerCase()}`}
                className="hover:text-red-600 transition duration-200"
              >
                {category}
              </a>
            </li>
          )
        )}
      </ul>
    </div>
  </div>
);

// Legal Links Component
const LegalLinks = () => (
  <div className="text-center md:text-left">
    <h2 className="text-lg font-serif font-semibold mb-4">Legal Links</h2>
    <ul className="space-y-2">
      <li>
        <a
          href="/privacy"
          className="hover:text-red-600 transition duration-200"
        >
          Privacy Policy
        </a>
      </li>
      <li>
        <a href="/terms" className="hover:text-red-600 transition duration-200">
          Terms of Service
        </a>
      </li>
    </ul>
  </div>
);

// Contact Information Component
const ContactInfo = () => (
  <div className="text-center md:text-left">
    <h2 className="text-lg font-serif font-semibold mb-4">Contact Us</h2>
    <p className="text-sm mb-2">
      Email:{" "}
      <a
        href="mailto:khadkaaayush90@gmail.com"
        className="hover:text-red-600 transition duration-200"
      >
        khadkaaayush90@gmail.com
      </a>
    </p>
    <p className="text-sm">Location: Amrit Marga, Kathmandu, Nepal</p>
  </div>
);

// Sources Component with Logos
const Sources = () => (
  <div className="text-center md:text-left">
    <h2 className="text-lg font-serif font-semibold mb-4">News Sources</h2>
    <ul className="space-y-2">
      <li className="flex items-center">
        <a
          href="https://kathmandupost.com"
          className="hover:text-red-600 transition duration-200 flex items-center"
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
      <li className="flex items-center">
        <a
          href="https://risingnepaldaily.com/"
          className="hover:text-red-600 transition duration-200 flex items-center"
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
    <footer className="bg-[#F3F4F6] text-black py-8 border-t border-gray-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-start gap-24">
          <GeneralLinks />
          <NewsCategories />
          <LegalLinks />
          <ContactInfo />
          <Sources />
        </div>

        <div className="mt-8 flex justify-center space-x-6">
          <a href="#" className="hover:text-gray-600 transition duration-200">
            <FaGithub size={24} />
          </a>
          <a href="#" className="hover:text-blue-600 transition duration-200">
            <FaLinkedin size={24} />
          </a>
        </div>

        <div className="mt-8 border-t border-gray-300 pt-6 text-center">
          <p className="text-sm font-serif">
            &copy; {currentYear} The Samachar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
