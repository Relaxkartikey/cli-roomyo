"use client";
import React from "react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="hidden md:block w-full bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            © {currentYear} <span className="font-bold">Roomyo</span>. All rights reserved.
          </p>
          <Link
            href="https://kartikey.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-primary transition-colors"
          >
            Developed by <span className="text-primary">@RelaxKartikey</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
