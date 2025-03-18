"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  CheckCircle2, X, ArrowRight, Building, 
  Shield, Users, Zap, Clock, CheckSquare,
  ClipboardCheck, BadgeCheck, Rocket, Upload, Home, Building2, MapPin, DollarSign, BedDouble, Bath, Square
} from "lucide-react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";

// Form component will be defined separately
const ListingForm = () => {
  return (
    <form className="bg-white rounded-xl p-8 shadow-lg space-y-6">
      <h3 className="text-2xl font-bold mb-6">List Your Property</h3>
      
      <div className="space-y-4">
        <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-primary/20 transition-colors">
          <option value="">Select Role</option>
          <option value="owner">Owner</option>
          <option value="agent">Agent</option>
        </select>

        <input
          type="text"
          placeholder="Your Name"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-primary/20 transition-colors"
        />

        <input
          type="tel"
          placeholder="Phone Number*"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-primary/20 transition-colors"
        />

        <input
          type="email"
          placeholder="Email (Optional)"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-primary/20 transition-colors"
        />

        <textarea
          placeholder="Property Details (Location, Rent, Amenities, etc.)"
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-primary/20 transition-colors"
        />

        <button
          type="submit"
          className="w-full bg-primary text-white px-6 py-4 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 text-lg font-semibold"
        >
          List My Property Now
          <Rocket className="w-5 h-5" />
        </button>
      </div>

      <p className="text-sm text-gray-500 text-center mt-4">
        By submitting, you agree to our Terms of Service
      </p>
    </form>
  );
};

const FEATURES = [
  {
    icon: Building,
    title: "Free Listing",
    description: "List your property without any charges"
  },
  {
    icon: Shield,
    title: "Verified Tenants",
    description: "Connect with pre-verified tenants only"
  },
  {
    icon: Users,
    title: "Maximum Reach",
    description: "Reach hundreds of potential tenants daily"
  },
  {
    icon: Zap,
    title: "Quick Approval",
    description: "Get your listing live within 48 hours"
  }
];

const STEPS = [
  {
    icon: ClipboardCheck,
    title: "Register Your Property",
    description: "Fill in basic details about your property and contact information"
  },
  {
    icon: BadgeCheck,
    title: "Verification Process",
    description: "Quick verification by our team to ensure authenticity"
  },
  {
    icon: Rocket,
    title: "Go Live & Start Earning",
    description: "Your property goes live and starts receiving tenant inquiries"
  }
];

const COMPARISON = [
  { feature: "Free Listing", roomyo: true, others: false },
  { feature: "Verified Tenants", roomyo: true, others: false },
  { feature: "Fast Listing Approval", roomyo: true, others: false },
  { feature: "Promotions", roomyo: true, others: false },
  { feature: "Hassle-Free Experience", roomyo: true, others: false }
];

export default function ListPropertyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
            alt="Modern Property"
            fill
            className="object-cover brightness-[0.85]"
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              List Your Property on Roomyo — Absolutely Free!
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-100">
              Get Verified Tenants. Hassle-Free Listing. Assured Rentals.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#listing-form"
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
              >
                List My Property Now
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                href="/contact"
                className="bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
              >
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why List Your Property with Us?
              <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How It Works — Simple 3-Step Process
              <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg relative"
                >
                  <div className="absolute -top-4 left-6 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Makes Roomyo Different?
              <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-3 bg-gray-50 p-4">
                <div className="font-semibold">Feature</div>
                <div className="font-semibold text-center">Roomyo Offers</div>
                <div className="font-semibold text-center">Other Platforms</div>
              </div>
              {COMPARISON.map((item, index) => (
                <div
                  key={item.feature}
                  className={`grid grid-cols-3 p-4 ${
                    index !== COMPARISON.length - 1 ? "border-b" : ""
                  }`}
                >
                  <div>{item.feature}</div>
                  <div className="flex justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                  <div className="flex justify-center">
                    <X className="w-6 h-6 text-red-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="listing-form" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to List Your Property?
                  <div className="w-20 h-1 bg-primary mt-4"></div>
                </h2>
                <p className="text-gray-600">
                  Join 500+ property owners who already trust Roomyo for hassle-free tenant search.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-gray-700">Get your property listed within 48 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-gray-700">Access to verified tenants only</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-gray-700">Free marketing and promotions</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <ListingForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-8">
              Our team is here to help you get started with listing your property
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg transition-colors"
            >
              Contact Us
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Terms and Conditions Strip */}
      <div className="bg-gray-50 py-4 text-center border-t border-gray-200">
        <p className="text-sm text-gray-500">*Terms and conditions applied</p>
      </div>
    </main>
  );
} 