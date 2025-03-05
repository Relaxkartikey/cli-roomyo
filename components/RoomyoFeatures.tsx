"use client";
import React from "react";
import { motion } from "framer-motion";
import { Wifi, Shield, Home, Utensils, Sparkles, Smartphone } from "lucide-react";

const features = [
  {
    title: "Fully Furnished",
    description: "Modern furniture and essential amenities included",
    icon: Home
  },
  {
    title: "IHM Trained Resident Managers",
    description: "Professional hospitality management",
    icon: Sparkles
  },
  {
    title: "Daily Professional Housekeeping",
    description: "Keep your space clean and fresh",
    icon: Sparkles
  },
  {
    title: "3-Tier Security",
    description: "24/7 security for your peace of mind",
    icon: Shield
  },
  {
    title: "High-speed Wifi",
    description: "Stay connected with fast internet",
    icon: Wifi
  },
  {
    title: "App-Enabled Living",
    description: "Manage everything from your phone",
    icon: Smartphone
  }
];

const RoomyoFeatures = () => {
  return (
    <section className="py-12 bg-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-gray-900 font-bold text-4xl md:text-5xl mb-8">
            Roomyo Space Comes With
            <div className="w-12 h-1 bg-blue-600 mx-auto mt-4"></div>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience premium living with our comprehensive amenities and services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-xl border border-gray-100 p-6 hover:border-blue-600/50 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-blue-50">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomyoFeatures; 