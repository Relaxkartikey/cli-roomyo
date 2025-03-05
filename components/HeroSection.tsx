"use client";
import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/herobg.png')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight"
          >
            White Box Media.
            <div className="w-48 h-1 bg-red-600 mx-auto mt-4"></div>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto text-lg md:text-xl text-gray-200 mb-12"
          >
            White Box Media is your premier partner in creating unforgettable events with top-notch graphics and video production. From weddings and corporate events to social gatherings, we turn your vision into reality, providing impeccable services and creativity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="/contact"
              className="inline-block bg-[#b91c1c] text-white px-8 py-4 text-lg font-semibold uppercase tracking-wider hover:bg-[#991b1b] transition-colors duration-300 rounded-md"
            >
              Get In Touch
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
