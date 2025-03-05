"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { clients } from "@/lib/data";

const fallbackImage = "https://cdn.whiteboxmedia.co.in/logo.PNG";

const ClientLogos: React.FC = () => {
  const [failedImages, setFailedImages] = useState<{ [key: string]: boolean }>({});

  const handleImageError = (clientName: string) => {
    setFailedImages(prev => ({ ...prev, [clientName]: true }));
  };

  return (
    <section className="w-full bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-bold text-4xl md:text-5xl mb-8">
            Our Clients
            <div className="w-12 h-1 bg-red-600 mx-auto mt-4"></div>
          </h2>
          <p className="text-neutral-300 max-w-2xl mx-auto">
            We are proud to have worked with some of the most innovative and forward-thinking companies. Here are some of our valued clients.
          </p>
        </motion.div>

        <div className="relative w-full overflow-hidden">
          <div className="relative flex gap-8 py-4">
            <motion.div
              className="flex shrink-0 gap-8"
              animate={{
                x: ["0%", "-50%"]
              }}
              transition={{
                duration: 20,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={index}
                  className="bg-black/80 backdrop-blur-sm rounded-xl border border-white/10 shadow-2xl p-6 hover:border-red-600/50 transition-colors h-48 flex items-center justify-center shrink-0"
                  style={{ width: '200px' }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={failedImages[client.name] ? fallbackImage : client.logo}
                      alt={client.name}
                      fill
                      className="object-contain p-4"
                      onError={() => handleImageError(client.name)}
                      sizes="200px"
                      priority
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="relative flex gap-8 py-4 mt-8">
            <motion.div
              className="flex shrink-0 gap-8"
              animate={{
                x: ["-50%", "0%"]
              }}
              transition={{
                duration: 20,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {[...clients, ...clients].reverse().map((client, index) => (
                <div
                  key={index}
                  className="bg-black/80 backdrop-blur-sm rounded-xl border border-white/10 shadow-2xl p-6 hover:border-red-600/50 transition-colors h-48 flex items-center justify-center shrink-0"
                  style={{ width: '200px' }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={failedImages[client.name] ? fallbackImage : client.logo}
                      alt={client.name}
                      fill
                      className="object-contain p-4"
                      onError={() => handleImageError(client.name)}
                      sizes="200px"
                      priority
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos; 