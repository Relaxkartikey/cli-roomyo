"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, Wifi, Home, Users, Dumbbell, Calendar, Shield, 
  Shirt, Briefcase, Coffee, Gamepad, Phone, MapPin, Clock,
  Utensils, Smartphone, Lock, Building, CreditCard, Sparkles,
  Waves, PartyPopper, Tv, CheckCircle2, Zap
} from "lucide-react";

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
    icon: Waves,
    title: "Swimming & Wellness",
    description: "Rooftop pools and wellness spaces for relaxation"
  },
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

export default function PrivilegesPage() {
  return (
    <main className="min-h-screen bg-secondary">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
          alt="Luxury Living at Roomyo"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 flex flex-col items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Where Luxury Meets Convenience
            <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200 mb-8"
          >
            Experience world-class amenities, hassle-free services, and a vibrant community
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="#privileges"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors"
            >
              ✨ Explore Your Exclusive Privileges
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Privileges Section */}
      <section id="privileges" className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Exclusive Privileges
              <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover a lifestyle where every detail is crafted for your comfort and convenience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {AMENITIES.map((amenity, index) => {
              const Icon = amenity.icon;
              return (
                <motion.div
                  key={amenity.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{amenity.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{amenity.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lifestyle Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Live Life to the Fullest
              <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Immerse yourself in a lifestyle that combines luxury, wellness, and entertainment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {LIFESTYLE_FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-secondary/50 rounded-xl p-8 hover:bg-secondary transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-lg">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Benefits Section */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Transparent Pricing, No Hidden Costs
              <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              All-inclusive living with zero brokerage and no security deposit
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING_BENEFITS.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white shadow-lg rounded-xl p-6 text-center"
                >
                  <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Roomyo Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Why Choose Roomyo?
                <div className="w-20 h-1 bg-primary mt-4"></div>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Experience hassle-free living with premium amenities and a vibrant community
              </p>
              <div className="grid grid-cols-1 gap-4">
                {WHY_CHOOSE.map((reason, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{reason}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af"
                alt="Roomyo Living Experience"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Advantages Section */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Prime Locations
              <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Strategically located in the heart of the city, close to everything that matters
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {['Business Hubs', 'Universities', 'Shopping Centers', 'Metro Stations'].map((location, index) => (
              <motion.div
                key={location}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white shadow-lg rounded-xl p-6 text-center"
              >
                <MapPin className="w-6 h-6 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold">Near {location}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Join a Thriving Community
                <div className="w-20 h-1 bg-primary mt-4"></div>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Network, collaborate, and build lasting friendships with like-minded individuals in our vibrant community
              </p>
              <div className="grid grid-cols-3 gap-8">
                {STATS.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad"
                alt="Roomyo Community"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-24 bg-secondary">
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/0" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Elevate Your Lifestyle?
              <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get in touch to learn more about our zero-brokerage, all-inclusive living spaces
            </p>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg placeholder:text-gray-400 focus:border-primary focus:ring-primary/20 transition-colors"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg placeholder:text-gray-400 focus:border-primary focus:ring-primary/20 transition-colors"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg placeholder:text-gray-400 focus:border-primary focus:ring-primary/20 transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Start Your Journey
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 