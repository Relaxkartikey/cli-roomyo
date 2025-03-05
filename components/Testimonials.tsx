"use client";
import React from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";

function Testimonials() {
  return (
    <section className="py-16 w-full bg-black relative">
      <div className="max-w-[2000px] mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 relative z-30"
        >
          <h2 className="text-white font-bold text-4xl md:text-5xl mb-8">
            What People Say About Us
            <div className="w-12 h-1 bg-red-600 mx-auto mt-4"></div>
          </h2>
          <p className="text-white max-w-2xl mx-auto">
            Discover what our clients have to say about their experiences with White Box Media
          </p>
        </motion.div>

        <div className="relative w-full overflow-hidden">
          <div className="relative flex gap-8 py-4">
            <motion.div
              className="flex shrink-0 gap-8"
              animate={{
                x: ["0%", "-100%"]
              }}
              transition={{
                duration: 40,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  className="group relative h-[300px] w-[400px] flex-shrink-0 overflow-hidden rounded-2xl bg-black p-8 border border-neutral-800 hover:border-red-600/50 transition-colors duration-300"
                >
                  <div className="relative h-full flex flex-col justify-between z-20">
                    <div>
                      <p className="text-xl text-white/90 font-normal leading-relaxed">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                    </div>
                    <div className="mt-8">
                      <p className="text-lg font-semibold text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-base text-white/70">{testimonial.title}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0 z-10"></div>
                  <div className="absolute inset-0 bg-neutral-950 opacity-80 group-hover:opacity-70 transition-opacity duration-300"></div>
                </div>
              ))}
            </motion.div>
            <motion.div
              className="flex shrink-0 gap-8"
              animate={{
                x: ["0%", "-100%"]
              }}
              transition={{
                duration: 40,
                ease: "linear",
                repeat: Infinity,
                delay: 0
              }}
              aria-hidden="true"
            >
              {testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  className="group relative h-[300px] w-[400px] flex-shrink-0 overflow-hidden rounded-2xl bg-black p-8 border border-neutral-800 hover:border-red-600/50 transition-colors duration-300"
                >
                  <div className="relative h-full flex flex-col justify-between z-20">
                    <div>
                      <p className="text-xl text-white/90 font-normal leading-relaxed">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                    </div>
                    <div className="mt-8">
                      <p className="text-lg font-semibold text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-base text-white/70">{testimonial.title}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0 z-10"></div>
                  <div className="absolute inset-0 bg-neutral-950 opacity-80 group-hover:opacity-70 transition-opacity duration-300"></div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-20"></div>
    </section>
  );
}

export default Testimonials; 