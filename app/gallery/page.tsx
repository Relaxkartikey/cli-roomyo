"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import HeroTitle from "@/components/HeroTitle";
import { galleryImages as images } from "@/lib/data";

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-black">
      <HeroTitle 
        title="Gallery" 
        subtitle="Showcasing Our Best Work and Creative Excellence"
      />

      <section className="py-16 md:py-24 w-full bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {images.map((image, idx) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-black/50 border border-neutral-800 hover:border-red-600/50 transition-all duration-300"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {image.alt}
                    </h3>
                    <p className="text-sm text-white/70">
                      {image.category}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
} 