"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "What makes Roomyo different from traditional PG and rental options?",
    answer: "Roomyo offers a curated selection of verified PGs and rental spaces with transparent pricing, high-quality amenities, and a seamless booking process. We focus on creating a trustworthy platform where you can find comfortable living spaces that match your lifestyle and budget."
  },
  {
    question: "How does Roomyo verify its listed properties?",
    answer: "Each property on Roomyo undergoes a thorough verification process. We personally visit and assess the facilities, check legal documentation, verify owner credentials, and ensure all listed amenities are functional. This helps us maintain high standards and provide reliable options to our users."
  },
  {
    question: "What types of accommodations can I find on Roomyo?",
    answer: "Roomyo features a diverse range of living spaces including PG accommodations, shared apartments, studio apartments, and private rooms. Whether you're a student, working professional, or someone looking for a comfortable stay, we have options tailored to different needs and preferences."
  },
  {
    question: "How do I book a space through Roomyo?",
    answer: "Booking on Roomyo is simple: browse listings, use filters to find your ideal space, schedule a visit or virtual tour, and book directly through our platform. Our team assists throughout the process, from initial inquiry to move-in, ensuring a smooth experience."
  },
  {
    question: "What amenities are typically included in Roomyo listings?",
    answer: "Most Roomyo properties include essential amenities like furnished rooms, Wi-Fi, regular housekeeping, security, and basic utilities. Premium listings may offer additional facilities like gym access, meal services, entertainment areas, and study rooms. Each listing clearly specifies its included amenities."
  },
  {
    question: "Is there a minimum stay duration at Roomyo properties?",
    answer: "Stay duration varies by property. While most PGs and shared spaces have a minimum stay of 3-6 months, some properties offer flexible short-term stays. Long-term rentals typically require a minimum 11-month commitment. Check individual listings for specific terms."
  },
  {
    question: "How does Roomyo ensure safety and security?",
    answer: "Safety is our priority. All Roomyo properties feature security measures like CCTV cameras, professional security staff, and secure access systems. We also maintain emergency contact protocols and regular security audits to ensure resident safety."
  },
  {
    question: "What is the payment structure for Roomyo bookings?",
    answer: "Payments typically include a security deposit and monthly rent. We ensure transparent pricing with no hidden charges. All payments are handled securely through our platform, and we provide proper documentation for all transactions."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-12 w-full bg-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
            <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about Roomyo's services
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto mb-12">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-primary/50 transition-colors"
              >
                <span className="text-left font-medium">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-primary" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-primary" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-white/5 backdrop-blur-sm border-x border-b border-white/10 rounded-b-lg">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center"
        >
          <Link 
            href="/blogs" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Read More Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}