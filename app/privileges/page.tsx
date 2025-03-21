"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, Wifi, Home, Users, Dumbbell, Calendar, Shield, 
  Shirt, Briefcase, Coffee, Gamepad, Phone, MapPin, Clock,
  Utensils, Smartphone, Lock, Building, CreditCard, Sparkles,
  Waves, PartyPopper, Tv, CheckCircle2, Zap, CheckCircle
} from "lucide-react";
import ContactForm from "@/components/ContactForm";

const AMENITIES = [
  {
    icon: Home,
    title: "Fully Furnished Living",
    description: "Premium furniture, cozy bedding, and ergonomic workspaces with balconies."
  },
  {
    icon: Users,
    title: "24/7 Resident Assistance",
    description: "IHM-trained hospitality experts and dedicated managers at your service."
  },
  {
    icon: Shirt,
    title: "Doorstep Laundry",
    description: "Twice-weekly service with premium care and quality detergents."
  },
  {
    icon: Wifi,
    title: "High-Speed Wi-Fi",
    description: "Lightning-fast internet for work, streaming, and gaming."
  },
  {
    icon: Utensils,
    title: "Gourmet Meals",
    description: "Chef-curated healthy meals with local and international cuisines."
  },
  {
    icon: Shield,
    title: "3-Tier Security",
    description: "Biometric locks, CCTV surveillance, and trained security personnel."
  },
  {
    icon: Smartphone,
    title: "Smart Living App",
    description: "Manage rent, maintenance, and community events with a single tap."
  },
  {
    icon: Dumbbell,
    title: "Fitness & Recreation",
    description: "State-of-the-art gym, gaming zones, and wellness spaces."
  },
  {
    icon: MapPin,
    title: "Prime Locations",
    description: "Minutes from business hubs, universities, and entertainment zones."
  }
];

const STATS = [
  { number: "500+", label: "Happy Residents" },
  { number: "100+", label: "Social Events Yearly" },
  { number: "15+", label: "Prime Locations" }
];

const LIFESTYLE_FEATURES = [
  {
    icon: PartyPopper,
    title: "Social Events",
    description: "Regular movie nights, cultural fests, and community gatherings"
  },
  {
    icon: Tv,
    title: "Entertainment Zones",
    description: "Gaming consoles, pool tables, and lounge areas"
  },
  {
    icon: Coffee,
    title: "Café & Workspaces",
    description: "Dedicated areas for work and casual meetings"
  }
];

const PRICING_BENEFITS = [
  {
    icon: CreditCard,
    title: "Zero Brokerage",
    description: "No hidden fees or charges - what you see is what you pay"
  },
  {
    icon: Sparkles,
    title: "All-Inclusive Pricing",
    description: "Rent covers all amenities, utilities, and services"
  },
  {
    icon: Zap,
    title: "Flexible Terms",
    description: "Choose from monthly, quarterly, or yearly payment plans"
  }
];

const WHY_CHOOSE = [
  "Premium locations in city hotspots",
  "Vibrant community of like-minded individuals",
  "Professional housekeeping services",
  "24/7 maintenance support",
  "High-speed internet connectivity",
  "Regular community events",
  "Zero security deposit worries",
  "Fully furnished luxury spaces"
];

// Hero Section Content
const HERO_CONTENT = {
  title: "Privileges by Roomyo",
  subtitle: "Discover the unmatched living experience with Roomyo — where comfort, care, and convenience meet. Explore our exclusive privileges that redefine rental accommodations in Jaipur.",
  image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
};

// Main Features Content
const MAIN_FEATURES = [
  {
    title: "Fully Furnished Rooms",
    description: "Spacious, aesthetic & upscale living spaces designed for modern professionals",
    icon: Home,
    details: [
      "Luxurious furniture",
      "Work-from-home compatible desks",
      "Balcony views (in selected properties)",
      "High-end fittings and décor"
    ],
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Laundry Services",
    description: "Professional laundry services for your convenience",
    icon: Sparkles,
    details: [
      "Regular laundry pickup",
      "Professional cleaning",
      "Timely delivery",
      "Quality service"
    ],
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "High-Speed Internet",
    description: "Lightning-fast, reliable Wi-Fi throughout the property",
    icon: Wifi,
    details: [
      "Seamless work-from-home experience",
      "Smooth video calls & streaming",
      "Uninterrupted gaming",
      "24/7 technical support"
    ],
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Gourmet Meals",
    description: "Fresh, healthy, and delicious meals prepared by expert chefs",
    icon: Utensils,
    details: [
      "Balanced nutritious diet",
      "Home-like taste",
      "Hygienic preparation",
      "Multiple cuisine options"
    ],
    image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=1000&q=80"
  }
];

// Add after MAIN_FEATURES
const COMPARISON_DATA = {
  features: [
    "Fully Furnished Rooms",
    "Daily Housekeeping",
    "Gourmet Meals",
    "Laundry Services",
    "IHM-Trained Managers",
    "No Brokerage",
    "3-Tier Security",
    "Community Events"
  ],
  roomyo: Array(8).fill(true),
  others: [false, false, false, false, false, true, false, false]
};

export default function PrivilegesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_CONTENT.image}
            alt="Luxury Living"
            fill
            className="object-cover brightness-[0.65]"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {HERO_CONTENT.title}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-100">
              {HERO_CONTENT.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/spaces"
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
              >
                Explore Properties
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#inquiry-form"
                className="bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
              >
                Accommodation Enquiry
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {MAIN_FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                >
                  <div className="relative h-64">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-gray-600 mb-6">{feature.description}</p>
                    <ul className="space-y-3 mb-6">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="#inquiry-form"
                      className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Inquire Now
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lifestyle Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Lifestyle & Entertainment</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience a vibrant community life with premium amenities and engaging activities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {LIFESTYLE_FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center flex flex-col items-center"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why Roomyo Is Different?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how we compare to traditional Rental Spaces accommodations
            </p>
          </motion.div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-gray-900">Feature</th>
                  <th className="px-6 py-4 text-center text-primary">Roomyo</th>
                  <th className="px-6 py-4 text-center text-gray-600">Other Rental Spacess</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_DATA.features.map((feature, index) => (
                  <tr key={feature} className="border-t border-gray-100">
                    <td className="px-6 py-4 text-gray-900">{feature}</td>
                    <td className="px-6 py-4 text-center">
                      {COMPARISON_DATA.roomyo[index] ? (
                        <CheckCircle2 className="w-6 h-6 text-primary mx-auto" />
                      ) : (
                        <span className="text-gray-400">✕</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {COMPARISON_DATA.others[index] ? (
                        <CheckCircle2 className="w-6 h-6 text-gray-400 mx-auto" />
                      ) : (
                        <span className="text-gray-400">✕</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Transparent Pricing</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple and clear pricing with no hidden charges
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING_BENEFITS.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all border border-gray-100"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-primary" />
              </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
            );
          })}
        </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="inquiry-form" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Additional Accommodations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Interested in our additional services? Let us know your requirements and we'll help you customize your stay
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <ContactForm 
              showTitle={false}
              messageLabel="Required Services"
              messagePlaceholder="Please specify which additional services you're interested in (e.g., Laundry, Meals, etc.)"
            />
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Experience Premium Living?</h2>
            <p className="text-gray-600 mb-8">
              Book your perfect accommodation in Jaipur today and join our community of happy residents!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/spaces"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg flex items-center gap-2 transition-colors"
              >
                Explore Properties
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-lg flex items-center gap-2 transition-colors border border-gray-200"
              >
                Contact Us
                <Phone className="w-5 h-5" />
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-6">*Terms and conditions applied</p>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 