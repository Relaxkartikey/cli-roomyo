"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const bookingSteps = [
  {
    icon: "🔍",
    title: "Discover & Compare",
    description: "Find your perfect space with our detailed property listings",
    details: [
      "Browse high-quality photos and virtual tours",
      "Compare amenities and features",
      "Check detailed pricing and availability",
      "Filter by location and preferences"
    ]
  },
  {
    icon: "📝",
    title: "Submit Booking Request",
    description: "Share your requirements through our simple booking form",
    details: [
      "Fill in your personal details",
      "Specify your preferred move-in date",
      "Mention any special requirements",
      "Submit your interest to our team"
    ]
  },
  {
    icon: "✨",
    title: "Request Processing",
    description: "Our team reviews your request and prepares personalized options",
    details: [
      "Receive request acknowledgment",
      "Property availability confirmation",
      "Custom recommendations based on needs",
      "Direct communication with our team"
    ]
  },
  {
    icon: "🏠",
    title: "Property Visit",
    description: "Schedule a visit to experience your chosen property",
    details: [
      "Arrange viewing at your convenience",
      "Meet our property expert on-site",
      "Ask questions and get clarity",
      "Explore the neighborhood"
    ]
  },
  {
    icon: "📄",
    title: "Booking Confirmation",
    description: "Complete the booking process with our agent's assistance",
    details: [
      "Review terms and documentation",
      "Get guidance on payment process",
      "Complete necessary verifications",
      "Receive booking confirmation"
    ]
  },
  {
    icon: "🎉",
    title: "Welcome Home",
    description: "Start your journey in your new home with our support",
    details: [
      "Get move-in instructions",
      "Connect with property manager",
      "Access essential information",
      "Enjoy dedicated support service"
    ]
  }
];

const BookingProcess = () => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <section className="py-16 bg-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Roomyo Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Our simple process makes finding and booking your perfect accommodation quick and hassle-free.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookingSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300 shadow-md hover:shadow-xl ${
                expandedStep === idx ? 'ring-2 ring-primary/20 shadow-lg' : 'hover:border-primary/20'
              }`}
            >
              <button
                onClick={() => setExpandedStep(expandedStep === idx ? null : idx)}
                className="w-full text-left p-6 hover:bg-gray-50/50 transition-colors duration-300"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{step.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                    <p className="text-gray-500 mt-2 text-sm">{step.description}</p>
                  </div>
                </div>
              </button>

              {expandedStep === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6"
                >
                  <div className="pt-4 border-t border-gray-100">
                    <ul className="space-y-3">
                      {step.details.map((detail, detailIdx) => (
                        <motion.li
                          key={detail}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: detailIdx * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-gray-600">{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingProcess; 