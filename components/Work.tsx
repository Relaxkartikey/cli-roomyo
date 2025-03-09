import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BookingProcess = () => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <section className="py-16 bg-secondary">
      <div className="max-w-7xl mx-auto px-4">
        {/* ... existing header code ... */}

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