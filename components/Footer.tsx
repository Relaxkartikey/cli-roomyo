"use client";
import React from "react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <p className="text-center text-sm text-gray-400">
          © 2013-{currentYear} <span className="font-bold">WhiteBoxMedia</span>. Developed By{" "}
          <Link
            href="https://kartikey.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#e76b6b] transition-colors"
          >
            RelaxKartikey
          </Link>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
