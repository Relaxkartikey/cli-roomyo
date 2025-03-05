"use client";
import React from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";

function Testimonials() {
  return (
    <section className="py-12 w-full bg-gray-50 relative">
      <div className="max-w-[2000px] mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 relative z-30"
        >
          <h2 className="text-gray-900 font-bold text-4xl md:text-5xl mb-8">
            What Users Say About Roomyo
            <div className="w-12 h-1 bg-blue-600 mx-auto mt-4"></div>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover what our residents have to say about their Roomyo experience
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
                  className="group relative h-[300px] w-[400px] flex-shrink-0 overflow-hidden rounded-2xl bg-white p-8 shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300"
                >
                  <div className="relative h-full flex flex-col justify-between z-20">
                    <div>
                      <p className="text-xl text-gray-700 font-normal leading-relaxed">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                    </div>
                    <div className="mt-8">
                      <p className="text-lg font-semibold text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-base text-gray-600">{testimonial.title}</p>
                    </div>
                  </div>
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
                  className="group relative h-[300px] w-[400px] flex-shrink-0 overflow-hidden rounded-2xl bg-white p-8 shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300"
                >
                  <div className="relative h-full flex flex-col justify-between z-20">
                    <div>
                      <p className="text-xl text-gray-700 font-normal leading-relaxed">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                    </div>
                    <div className="mt-8">
                      <p className="text-lg font-semibold text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-base text-gray-600">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-gray-50 z-20"></div>
    </section>
  );
}

export default Testimonials; 