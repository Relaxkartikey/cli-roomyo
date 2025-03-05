"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const bookingSteps = [
  {
    title: "Choose Location",
    description: "Select your preferred city and locality from our available locations across 7 major Indian cities.",
    icon: "🏠"
  },
  {
    title: "Browse Properties",
    description: "Explore our curated list of fully furnished properties and PG accommodations with detailed information.",
    icon: "🔍"
  },
  {
    title: "Schedule Visit",
    description: "Book a convenient time to visit the property and meet our resident manager.",
    icon: "📅"
  },
  {
    title: "Documentation",
    description: "Complete simple documentation process with minimal paperwork required.",
    icon: "📝"
  },
  {
    title: "Payment",
    description: "Secure your space with an easy payment process through multiple payment options.",
    icon: "💳"
  },
  {
    title: "Move In",
    description: "Get your keys and move into your new Roomyo space with all amenities ready.",
    icon: "🔑"
  }
];

const BookingProcess = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-gray-900 font-bold text-4xl md:text-5xl mb-8">
            How to Get Your Roomyo Space
            <div className="w-12 h-1 bg-blue-600 mx-auto mt-4"></div>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Simple steps to find and book your perfect living space
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Steps List */}
          <div className="lg:col-span-4">
            <div className="space-y-4">
              {bookingSteps.map((step, idx) => (
                <motion.button
                  key={idx}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                    activeStep === idx 
                      ? "bg-blue-600 text-white shadow-lg" 
                      : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setActiveStep(idx)}
                  initial={false}
                  animate={{ scale: activeStep === idx ? 1.05 : 1 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{step.icon}</span>
                    <span className="font-semibold">{step.title}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Content Display */}
          <div className="lg:col-span-8">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 rounded-2xl p-8 h-full shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">{bookingSteps[activeStep].icon}</span>
                <h3 className="text-2xl font-bold text-gray-900">{bookingSteps[activeStep].title}</h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                {bookingSteps[activeStep].description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingProcess;
