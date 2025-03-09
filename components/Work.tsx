"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const bookingSteps = [
  {
    icon: "🔍",
    title: "Search & Discover",
    description: "Find your ideal accommodation with our smart search filters",
    details: [
      "Filter by location, price, and amenities",
      "View high-quality photos and virtual tours",
      "Read verified reviews from previous tenants",
      "Compare multiple properties side by side"
    ]
  },
  {
    icon: "📱",
    title: "Schedule Visit",
    description: "Book a convenient time to see your potential new home",
    details: [
      "Choose from available time slots",
      "Receive confirmation via email and SMS",
      "Get reminders before your scheduled visit",
      "Easily reschedule if needed"
    ]
  },
  {
    icon: "📝",
    title: "Book Instantly",
    description: "Secure your preferred space with our simple booking process",
    details: [
      "Select your desired move-in date",
      "Complete a quick verification process",
      "Pay securely using multiple payment options",
      "Receive instant booking confirmation"
    ]
  },
  {
    icon: "📄",
    title: "Digital Agreement",
    description: "Complete all paperwork electronically without hassle",
    details: [
      "Review terms and conditions online",
      "Sign documents digitally from any device",
      "Store all agreements securely in your account",
      "Access your documents anytime, anywhere"
    ]
  },
  {
    icon: "💳",
    title: "Secure Payment",
    description: "Make payments confidently through our trusted platform",
    details: [
      "Multiple payment options available",
      "End-to-end encrypted transactions",
      "Automated receipts and payment history",
      "Set up recurring payments for convenience"
    ]
  },
  {
    icon: "🏠",
    title: "Move In With Ease",
    description: "Experience a smooth transition to your new accommodation",
    details: [
      "Get detailed directions to your property",
      "Connect with the property manager",
      "Receive digital access codes if applicable",
      "Enjoy 24/7 customer support for any issues"
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