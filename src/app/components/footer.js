"use client";

import { FaLinkedin, FaGithub } from "react-icons/fa";
import Link from "next/link";

const FooterSection = ({ title, children }) => (
  <div className="text-center sm:text-left">
    <h2 className="text-lg font-serif font-semibold mb-3 sm:mb-4 text-gray-800">
      {title}
    </h2>
    {children}
  </div>
);

const GeneralLinks = () => (
  <FooterSection title="General Links">
    <ul className="space-y-2">
      <li>
        <Link
          href="/"
          className="text-gray-600 hover:text-red-600 transition-colors duration-200"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/about"
          className="text-gray-600 hover:text-red-600 transition-colors duration-200"
        >
          About
        </Link>
      </li>
    </ul>
  </FooterSection>
);

const NewsCategories = () => (
  <FooterSection title="News Categories">
    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
      <div className="space-y-2">
        <Link
          href="/politics"
          className="text-gray-600 hover:text-red-600 transition-colors duration-200 block"
        >
          Politics
        </Link>
        <Link
          href="/world"
          className="text-gray-600 hover:text-red-600 transition-colors duration-200 block"
        >
          World
        </Link>
        <Link
          href="/business"
          className="text-gray-600 hover:text-red-600 transition-colors duration-200 block"
        >
          Business
        </Link>
        <Link
          href="/sports"
          className="text-gray-600 hover:text-red-600 transition-colors duration-200 block"
        >
          Sports
        </Link>
        <Link
          href="/editorial"
          className="text-gray-600 hover:text-red-600 transition-colors duration-200 block"
        >
          Editorial
        </Link>
      </div>
      <div className="space-y-2">
        <Link
          href="/health"
          className="text-gray-600 hover:text-red-600 transition-colors duration-200 block"
        >
          Health
        </Link>
        <Link
          href="/science-tech"
          className="text-gray-600 hover:text-red-600 transition-colors duration-200 block"
        >
          Science & Tech
        </Link>
        <Link
          href="/art-culture"
          className="text-gray-600 hover:text-red-600 transition-colors duration-200 block"
        >
          Art & Culture
        </Link>
        <Link
          href="/national"
          className="text-gray-600 hover:text-red-600 transition-colors duration-200 block"
        >
          National
        </Link>
        <Link
          href="/investigations"
          className="text-gray-600 hover:text-red-600 transition-colors duration-200 block"
        >
          Investigations
        </Link>
        <Link
          href="/climate-enviroment"
          className="text-gray-600 hover:text-red-600 transition-colors duration-200 block"
        >
          Climate and Enviroment
        </Link>
      </div>
    </div>
  </FooterSection>
);

const ContactInfo = () => (
  <FooterSection title="Contact Us">
    <div className="space-y-2">
      <p className="text-sm text-gray-600">
        Email:{" "}
        <a
          href="mailto:khadkaaayush90@gmail.com"
          className="hover:text-red-600 transition-colors duration-200"
        >
          khadkaaayush90@gmail.com
        </a>
      </p>
      <p className="text-sm text-gray-600">
        Location: Amrit Marga, Kathmandu, Nepal
      </p>
    </div>
  </FooterSection>
);

const Sources = () => (
  <FooterSection title="News Sources">
    <ul className="space-y-3">
      <li>
        <a
          href="https://kathmandupost.com"
          className="group flex items-center justify-center sm:justify-start text-gray-600 hover:text-red-600 transition-colors duration-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="w-8 h-8 mr-2 overflow-hidden rounded-md border border-gray-200 bg-white">
            <img
              src="/k-logo.png"
              alt="Kathmandu Post"
              className="w-full h-full object-contain"
            />
          </div>
          <span>The Kathmandu Post</span>
        </a>
      </li>
      <li>
        <a
          href="https://risingnepaldaily.com/"
          className="group flex items-center justify-center sm:justify-start text-gray-600 hover:text-red-600 transition-colors duration-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="w-8 h-8 mr-2 overflow-hidden rounded-md border border-gray-200 bg-white">
            <img
              src="/rlogo.jpg"
              alt="The Rising Nepal"
              className="w-full h-full object-contain"
            />
          </div>
          <span>The Rising Nepal</span>
        </a>
      </li>
    </ul>
  </FooterSection>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-800 pt-12 pb-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
          <GeneralLinks />
          <NewsCategories />
          <ContactInfo />
          <Sources />
        </div>

        <div className="mt-12 pt-6 border-t border-gray-100">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-6">
              <a
                href="https://github.com/Aayush-khadka/Nepali-News-Aggregrator-Backend"
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={22} />
              </a>
              <a
                href="https://www.linkedin.com/in/aayush-khadka-0513931b0/"
                className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={22} />
              </a>
            </div>
            <p className="text-sm text-gray-500">
              Made with <span className="text-red-500">💛</span> by Aayush
              Khadka
            </p>
            <p className="text-sm text-gray-400 font-serif">
              &copy; {currentYear} The Samachar. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
