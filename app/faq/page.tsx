"use client";
import React from "react";
import { motion } from "framer-motion";
import HeroTitle from "@/components/HeroTitle";

const faqs = [
  {
    question: "What services does White Box Media offer?",
    answer: "We offer comprehensive event management services including corporate events, weddings, product launches, brand activations, exhibitions, and social events. Our services also cover media production, photography, and videography."
  },
  {
    question: "How do I get started with planning my event?",
    answer: "Simply reach out to us through our contact form or give us a call. Our team will schedule a consultation to understand your vision, requirements, and budget to create a tailored event plan."
  },
  {
    question: "Do you handle both small and large-scale events?",
    answer: "Yes, we have experience managing events of all sizes. From intimate gatherings to large corporate conferences, we ensure the same level of dedication and professionalism."
  },
  {
    question: "What areas do you serve?",
    answer: "We primarily serve Jaipur and surrounding regions, but we're equipped to handle events across India. Our team is mobile and can travel to your preferred location."
  },
  {
    question: "How far in advance should I book your services?",
    answer: "We recommend booking at least 3-6 months in advance for large events and 1-2 months for smaller events. However, we can also accommodate last-minute requests based on availability."
  },
  {
    question: "What makes White Box Media different from other event management companies?",
    answer: "Our unique blend of event management expertise and media production capabilities sets us apart. We offer end-to-end solutions, ensuring seamless execution and high-quality documentation of your events."
  }
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-black">
      <HeroTitle 
        title="FAQ" 
        subtitle="Frequently Asked Questions About Our Services"
      />

      <section className="py-16 md:py-24 w-full bg-black">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid gap-6"
          >
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-black/50 border border-neutral-800 rounded-xl p-6 hover:border-red-600/50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-white/70">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </motion.div>
      </div>
    </section>
    </main>
  );
}
