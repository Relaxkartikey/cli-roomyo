"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-secondary px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
            Oops! Space Not Found
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The space you're looking for seems to have moved or doesn't exist. Let's help you find the perfect space.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <Link
              href="/spaces"
              className="flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg border-2 border-primary hover:bg-primary/5 transition-colors w-full sm:w-auto justify-center"
            >
              <Search className="w-5 h-5" />
              <span>Browse Spaces</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 