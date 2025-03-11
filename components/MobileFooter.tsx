"use client";
import React from "react";

export default function MobileFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="md:hidden w-full bg-white border-t border-gray-200 pb-20">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <p className="text-center text-sm text-gray-600">
          © {currentYear} <span className="font-bold">Roomyo</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
} 