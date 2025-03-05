"use client";
import React from "react";
import { motion } from "framer-motion";

interface HeroTitleProps {
  title: string;
  subtitle?: string;
}

const HeroTitle: React.FC<HeroTitleProps> = ({ title, subtitle }) => {
  return (
    <section className="relative w-full bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black z-10"></div>
      <div className="relative z-20 max-w-7xl mx-auto px-4 pt-28 pb-0 md:pt-36 md:pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold">
            {title}
            <div className="w-16 h-1 bg-red-600 mx-auto mt-4"></div>
          </h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto mt-4"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroTitle; 